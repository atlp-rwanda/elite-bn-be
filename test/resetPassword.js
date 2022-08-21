import chai from 'chai';
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app.js';
import models from '../src/database/models';
import * as userService from '../src/services/userServices';

const { Users } = models;
chai.should();

use(chaiHttp);

const registerdUser = {
  firstName: 'team elites',
  lastName: 'team elites',
  username: 'team elite',
  email: 'uwishema@gmail.com',
  password: '$2a$12$OkrGEhmd4qXHgY694JQPe.pp0ZaxIwshuJ.0bQS/z3SxmXtQxGNVy',
};

const validCredentials = {
  password: 'testing@1',
  confirm_password:'testing@1'
};

const invalidResetPassword = 'testing';
const invaliduserrEmail = 'shema@gmail.com';
let id, resetToken;

describe('reset password', () => {
  beforeEach(async () => {
    await Users.destroy({ where: { email: 'uwishema@gmail.com' } });
  });

  it('it should retun 404 if user does not exist', async () => {
    const res = await request(server).post('/api/v1/user/forgotPassword');
    expect(res).to.have.status(404);
  });
  it('it should return 200 if a user exist', async () => {
    await Users.create(registerdUser);
    const res = await request(server)
      .post('/api/v1/user/forgotPassword')
      .send({ ...registerdUser, email: 'uwishema@gmail.com' });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('resetToken');
    id = res.body.id;
    resetToken = res.body.resetToken;
  });
  it('it should return 404 if a user does not  exist', async () => {
    const res = await request(server).post('/api/v1/user/forgotPassword').send(invaliduserrEmail);
    expect(res).to.have.status(404);
  });
  it('it should return 400 if did not confirm password', async () => {
    const res = await request(server)
    .put(`/api/v1/user/resetPassword?token=${resetToken }`)
    .send(invalidResetPassword)
    expect(res).to.have.status(400);
  });

  it('it should return 200 if  password reset sucessful', async () => {
    const res = await request(server)
      .put(`/api/v1/user/resetPassword?token=${resetToken }`)
      .send({ ...validCredentials });
    expect(res).to.have.status(200);
    expect(res.body.data).to.have.property('message');
  });

  it('it should return 404 ', async () => {
    const res = await request(server)
      .put(`/api/v1/user/resetPassword/${resetToken}`)
      .send(invalidResetPassword);
    expect(res).to.have.status(404);
  });
});
