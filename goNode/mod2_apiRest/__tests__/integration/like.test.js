const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../../index');
const factory = require('../factories');
const sinon = require('sinon');

const { expect } = chai;
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');

chai.use(chaiHttp);

describe('Like', () => {
  beforeEach(async () => {
    await User.remove();
    await Tweet.remove();
  });

  it('should be able to like a tweet', async () => {
    const tweet = await factory.create('Tweet');

    const user = await factory.create('User');
    const jwtToken = user.generateToken();

    const response = await chai.request(app)
      .post(`/api/like/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response.body.likes).to.include(user.id);
  });

  it('should returns error if tweet does not exist', async () => {
    const tweet = await factory.create('Tweet');
    await Tweet.remove();

    const user = await factory.create('User');
    const jwtToken = user.generateToken();

    const response = await chai.request(app)
      .post(`/api/like/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });

  it('should toggle like', async () => {
    const tweet = await factory.create('Tweet');

    const user = await factory.create('User');
    const jwtToken = user.generateToken();

    const response = await chai.request(app)
      .post(`/api/like/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response.body.likes).to.include(user.id);

    const response2 = await chai.request(app)
      .post(`/api/like/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    expect(response2.body.likes).to.not.include(user.id);
  });

  it('should return failure if db save fails', async () => {
    const tweet = await factory.create('Tweet');
    const user = await factory.create('User');
    const jwtToken = user.generateToken();

    sinon.stub(Tweet.prototype, 'save').throws('test error');

    const response = await chai.request(app)
      .post(`/api/like/${tweet.id}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send();

    Tweet.prototype.save.restore();

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('error');
  });
});
