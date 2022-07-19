import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import { access } from 'fs';
import app from '../src/app';
import models from '../src/database/models';

const { Users, Chat } = models;

chai.should();

use(chaiHttp);

const credentials = {
  email: 'kakamao@gmail.com',
  password: 'kakamao@1234',
};

let accessToken;
const chat = {
  message: 'hello',
};

describe('/CREATE A MESSAGE', () => {
  it('should login before sending messge and return 200 is successful', async () => {
    const result = await chai.request(app).post('/api/v1/user/login').send(credentials);
    expect(result).to.have.status(200);
    accessToken = result.body.token;
  });

  it('should send messge and return 200 is successful', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/user/message')
      .set('Cookie', `jwt=${accessToken}`)
      .send({ ...chat });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success', true);
  });

  it('should  return 401 if not logged in', async () => {
    const res = await chai.request(app).post('/api/v1/user/message');
    expect(res).to.have.status(401);
  });

  it('should  return 400 if no message provided', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/user/message')
      .set('Cookie', `jwt=${accessToken}`);
    expect(res).to.have.status(400);
  });
  it('should  return all messages', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/user/messages')
      .set('Cookie', `jwt=${accessToken}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('success', true);
  });
});
