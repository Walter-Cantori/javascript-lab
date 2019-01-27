const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../../index');
const factory = require('../factories');
const sinon = require('sinon');

const { expect } = chai;
const User = mongoose.model('User');

chai.use(chaiHttp);

describe('Authentication', () => {
  beforeEach(async () => {
    await User.remove();
  });

  describe('Sign in', () => {
    it('it should be able to authenticate with valid credentials', async () => {
      const user = await factory.create('User', { password: '123456' });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: '123456' });

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });

    it('should not be able to signin with invalid user', async () => {
      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: 'foo@gmail', password: '1234' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('it should not be able to authenticate with invalid password', async () => {
      const user = await factory.create('User', { password: '123456' });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: '12345' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('it should fail if token gen fails', async () => {
      sinon.stub(User.prototype, 'generateToken').throws('test Error');
      const user = await factory.create('User', { password: '123456' });

      const response = await chai.request(app)
        .post('/api/signin')
        .send({ email: user.email, password: '123456' });

      User.prototype.generateToken.restore();

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });

  describe('Sign up', () => {
    it('should be able to create new user', async () => {
      // get user info from factory before saving on db
      const user = await factory.attrs('User');

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user);

      expect(response.body).to.have.property('user');
      expect(response.body).to.have.property('token');
    });

    it('should not be able to create user with duplicate email', async () => {
      // get user info from factory before saving on db
      const user = await factory.create('User');
      const user2 = await factory.attrs('User', {
        email: user.email,
      });

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user2);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });

    it('should fail if data has incorrect format', async () => {
      // get user info from factory before saving on db
      const user = await factory.attrs('User', {
        email: '',
      });

      const response = await chai.request(app)
        .post('/api/signup')
        .send(user);

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error');
    });
  });
});
