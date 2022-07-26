import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);

describe('TEST USER LOGOUT. ', () => {
  beforeEach(async () => {
    await Users.destroy({ where: { email: 'usertestme@gmail.com' } });
  });

  afterEach(async () => {
    await Users.destroy({ where: { email: 'usertestme@gmail.com' } });
  });

  const userToTest = {
    firstName: 'useme',
    lastName: 'fortest',
    email: 'usertestme@gmail.com',
    password: '$2a$12$OkrGEhmd4qXHgY694JQPe.pp0ZaxIwshuJ.0bQS/z3SxmXtQxGNVy',
  };
  const loggedUser = {
    email: 'usertestme@gmail.com',
    password: 'testme123',
  };
  it('should return empty when there is empty email or password', async () => {
    await Users.create({ ...userToTest });
    const result = await chai.request(app).post('/api/v1/user/login');

    expect(result).to.have.property('status', 400);
    expect(result).to.have.property('body');
  });

  it('should return wrong email or password when email incorrect', async () => {
    await Users.create(userToTest);
    const result = await chai
      .request(app)
      .post('/api/v1/user/login')
      .send({ ...loggedUser, email: 'notuser@gmail.com' });
    expect(result).to.have.property('status', 401);
    expect(result).to.have.property('body');
  });

  it('should return wrong email or password when password is incorrect', async () => {
    await Users.create(userToTest);
    const result = await chai
      .request(app)
      .post('/api/v1/user/login')
      .send({ ...loggedUser, password: 'fakepsw33' });

    expect(result).to.have.property('status', 401);
    expect(result).to.have.property('body');
  });

  it('should login when both email and password are correct', async () => {
    await Users.create(userToTest);

    const result = await chai.request(app).post('/api/v1/user/login').send(loggedUser);
    expect(result).to.have.property('status', 200);
    expect(result).to.have.property('body');
    expect(result.body).to.have.property('status', 'success');
    expect(result.body).to.have.property('message', 'User logged in successfully');
    expect(result.body).to.have.property('token');
  });
  it('Should  successfully logout', async () => {
    const result = await chai.request(app).get('/api/v1/user/logout');
    expect(result).to.have.property('status', 200);
    expect(result.body).to.have.property('status', 'success');
  });
});
