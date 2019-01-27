const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const factory = require('../factories');
const sinon = require('sinon');

const Tweet = mongoose.model('Tweet');
const User = mongoose.model('User');
const { expect } = chai;
chai.use(chaiHttp);

describe('tweets', () => {
  beforeEach(async () => {
    await Tweet.remove();
    await User.remove();
  });

  it('should create new tweet', async () => {
    const user = await factory.create('User');
    const tweet = await factory.attrs('Tweet', { user: user.id });

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .post('/api/tweets')
      .set('Authorization', `Bearer ${jwt}`)
      .send(tweet);

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('content');
  });

  it('should return error if create fails', async () => {
    const user = await factory.create('User');
    const tweet = await factory.attrs('Tweet', { user: user.id });

    sinon.stub(Tweet, 'create').throws('error');

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .post('/api/tweets')
      .set('Authorization', `Bearer ${jwt}`)
      .send(tweet);

    Tweet.create.restore();

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });

  it('should delete tweet', async () => {
    const user = await factory.create('User');
    const tweet = await factory.create('Tweet', { user: user.id });

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .delete(`/api/tweets/${tweet.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    expect(response).to.have.status(200);
  });

  it('should return error if remove fails', async () => {
    const user = await factory.create('User');
    const tweet = await factory.attrs('Tweet', { user: user.id });

    sinon.stub(Tweet, 'findByIdAndRemove').throws('error');

    const jwt = user.generateToken();

    const response = await chai.request(app)
      .delete(`/api/tweets/${tweet.id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send();

    Tweet.findByIdAndRemove.restore();

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });
});
