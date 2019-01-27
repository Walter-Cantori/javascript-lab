const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');
const factory = require('../factories');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiHttp);

const User = mongoose.model('User');

describe('follow', () => {
  beforeEach(async () => {
    await User.remove();
  });

  describe('Create follow', () => {
    it('should be able to follow other users', async () => {
      const currentUser = await factory.create('User');
      const userToFollow = await factory.create('User');

      const jwt = currentUser.generateToken();

      const response = await chai.request(app)
        .post(`/api/follow/${userToFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('following');
      expect(response.body.following).to.have.length(1);
    });

    it('should return error if user does not exist', async () => {
      const currentUser = await factory.create('User');
      const userToFollow = await factory.create('User');
      await userToFollow.remove();

      const jwt = currentUser.generateToken();

      const response = await chai.request(app)
        .post(`/api/follow/${userToFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('should return error if user is already following', async () => {
      const currentUser = await factory.create('User');
      const userToFollow = await factory.create('User');

      const jwt = currentUser.generateToken();

      await chai.request(app)
        .post(`/api/follow/${userToFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      const response2 = await chai.request(app)
        .post(`/api/follow/${userToFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      expect(response2).to.have.status(400);
      expect(response2.body).to.have.property('error');
    });

    it('should return error save fails', async () => {
      const currentUser = await factory.create('User');
      const userToFollow = await factory.create('User');

      sinon.stub(User.prototype, 'save').throws('test error');

      const jwt = currentUser.generateToken();

      const response = await chai.request(app)
        .post(`/api/follow/${userToFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      User.prototype.save.restore();

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });

  describe('Unfollow', () => {
    it('should be able to unfollow other users', async () => {
      const userToUnFollow = await factory.create('User');
      const currentUser = await factory.create('User', { following: [userToUnFollow.id] });
      userToUnFollow.followers.push(currentUser.id);
      await userToUnFollow.save();

      const jwt = currentUser.generateToken();

      const response = await chai.request(app)
        .delete(`/api/unfollow/${userToUnFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      expect(response).to.have.status(200);
      expect(response.body.following).to.have.length(0);
    });

    it('should return error if user does not exist', async () => {
      const currentUser = await factory.create('User');
      const userToUnFollow = await factory.create('User');
      await userToUnFollow.remove();

      const jwt = currentUser.generateToken();

      const response = await chai.request(app)
        .delete(`/api/unfollow/${userToUnFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('should return error if user is not following', async () => {
      const currentUser = await factory.create('User');
      const userUnToFollow = await factory.create('User');

      const jwt = currentUser.generateToken();

      const response = await chai.request(app)
        .delete(`/api/unfollow/${userUnToFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('should return error save fails', async () => {
      const userToUnFollow = await factory.create('User');
      const currentUser = await factory.create('User', { following: [userToUnFollow.id] });
      userToUnFollow.followers.push(currentUser.id);
      await userToUnFollow.save();

      sinon.stub(User.prototype, 'save').throws('test error');

      const jwt = currentUser.generateToken();

      const response = await chai.request(app)
        .delete(`/api/unfollow/${userToUnFollow.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send();

      User.prototype.save.restore();

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });
});
