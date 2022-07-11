import chai from 'chai';
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app.js';
import models from '../src/database/models';
import * as userService from '../src/services/userServices';

const { Users } = models;
chai.should();

use(chaiHttp);

const user = {
  firstName: 'Kalisa',
  lastName: 'Kevin',
  username: 'twist',
  email: 'kevinkalisa@gmail.com',
  password: 'andela@123',
};

const invalidEmail = {
  firstName: 'Kalisa',
  lastName: 'Kevin',
  username: 'twist',
  email: 'testemail',
  password: 'andela@123',
};

const invalidPassword = {
  firstName: 'Kalisa',
  lastName: 'Kevin',
  username: 'twist',
  email: 'kevinkalisa@gmail.com',
  password: 'andela123',
};

describe('/POST  register endpoint', () => {
  after(async () => {
    await Users.destroy({ where: { email: `${user.email}` } });
  });

  it('It should register a new user', async () => {
    const res = await request(server).post('/api/v1/user/register').send(user);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('accessToken');
  });

  it('It should return email already exists', async () => {
    const res = await request(server).post('/api/v1/user/register').send(user);
    expect(res).to.have.status(409);
  });
  it('It should return the password does not include in the response', async () => {
    const userInstance = await userService.findByEmail(user.email);
    expect(userInstance.password).to.equal(undefined);
  });

  it('It should return that invalid email', async () => {
    const res = await request(server).post('/api/v1/user/register').send(invalidEmail);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('Error');
  });

  it('It should return invalid password', async () => {
    const res = await request(server).post('/api/v1/user/register').send(invalidPassword);
    expect(res).to.have.status(400);
    expect(res.body).to.have.property('Error');
  });
});
