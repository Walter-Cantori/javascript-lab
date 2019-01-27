const chai = require('chai');
const factory = require('../factories');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const authMiddleware = require('../../app/middlewares/auth');

const { expect } = chai;

describe('Auth middleware', () => {
  it('it should validate the presence of JWT token', async () => {
    const request = httpMock.createRequest();
    const response = httpMock.createResponse();

    await authMiddleware(request, response);

    expect(response.statusCode).to.be.eq(401);
  });

  it('it should validate if token is valid', async () => {
    const request = httpMock.createRequest({
      headers: {
        authorization: 'Bearer 12333',
      },
    });
    const response = httpMock.createResponse();

    await authMiddleware(request, response);

    expect(response.statusCode).to.be.eq(401);
  });

  it('it should fail if token is malformed', async () => {
    const request = httpMock.createRequest({
      headers: {
        authorization: '1234',
      },
    });
    const response = httpMock.createResponse();

    await authMiddleware(request, response);

    expect(response.statusCode).to.be.eq(401);
  });

  it('it should fail if token is not Bearer', async () => {
    const request = httpMock.createRequest({
      headers: {
        authorization: 'Outh 1234',
      },
    });
    const response = httpMock.createResponse();

    await authMiddleware(request, response);

    expect(response.statusCode).to.be.eq(401);
  });

  it('it should pass if token is valid', async () => {
    const user = await factory.create('User');

    const request = httpMock.createRequest({
      headers: {
        authorization: `Bearer ${user.generateToken()}`,
      },
    });
    const response = httpMock.createResponse();

    const nextSpy = sinon.spy();

    await authMiddleware(request, response, nextSpy);

    expect(request).to.include({ userId: user.id });
    expect(nextSpy.calledOnce).to.be.true;
  });
});

