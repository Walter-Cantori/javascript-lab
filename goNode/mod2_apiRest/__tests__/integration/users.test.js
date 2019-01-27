const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const factory = require('../factories');
const sinon = require('sinon');

const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const app = require('../../index');

const { expect } = chai;
chai.use(chaiHttp);

describe('User tests', () => {
  beforeEach(async () => {
    User.remove();
    Tweet.remove();
  });

  it('should show user and tweet', async () => {
    const user = await factory.create('User');
    await factory.create('Tweet', { user: user.id });

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('user');
    expect(response.body.tweetCount).to.eq(1);
  });

  it('should return error on exception', async () => {
    const user = await factory.create('User');
    await factory.create('Tweet', { user: user.id });

    const jwt = user.generateToken();

    sinon.stub(User, 'findById').throws('test error');

    const response = await chai.request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    User.findById.restore();

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });

  it('should return user`s feed', async () => {
    const user = await factory.create('User');
    const user2 = await factory.create('User');
    await factory.create('Tweet', { user: user2.id });
    user.following.push(user2.id);
    await user.save();

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .get('/api/users/feed')
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.length(1);
  });

  it('should return error on exception', async () => {
    const user = await factory.create('User');
    await factory.create('Tweet', { user: user.id });

    const jwt = user.generateToken();

    sinon.stub(Tweet, 'find').throws('test error');

    const response = await chai.request(app)
      .get('/api/users/feed')
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    Tweet.find.restore();

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });

  it('should validate password and confirm password', async () => {
    const user = await factory.create('User');
    const user2 = await factory.attrs('User');

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .put('/api/users')
      .set('Authorization', `Bearer ${jwt}`)
      .send(user2);

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });

  it('should update user', async () => {
    const user = await factory.create('User');
    const user2 = await factory.attrs('User');

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .put('/api/users')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ ...user2, confirmPassword: user2.password });

    expect(response).to.have.status(200);
  });

  it('should update user when no password is sent', async () => {
    const user = await factory.create('User');
    const user2 = await factory.attrs('User');

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .put('/api/users')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ name: user2.name, email: user2.email });

    expect(response).to.have.status(200);
  });

  it('should return error on exception', async () => {
    const user = await factory.create('User');
    const user2 = await factory.attrs('User');

    const jwt = user.generateToken();

    sinon.stub(User.prototype, 'save').throws('test error');

    const response = await chai.request(app)
      .put('/api/users')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ ...user2, confirmPassword: user2.password });

    User.prototype.save.restore();

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });
});
