import { describe, it } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import app from '../src/app';

const day = new Date();
const yesterday = new Date(day.setDate(day.getDate() - 1));
const today = new Date(day.setDate(day.getDate() + 1));
const start = yesterday.toLocaleString();
const end = today.toLocaleString();

chai.use(chaiHTTP);
describe('Statistics test ', () => {
  it('The user logged in can get the number of trips made in range of time', async () => {
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');
    const managerAuth = result.body.token;
    const res= await chai
      .request(app)
      .get(`/api/v1/trip/statistics?start=${start}&end=${end}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.property('status', 200);
    expect(res.body.data).to.have.property(
      'message',
      `You succesfully got all trips you have made between ${start} and ${end} succesfully`
    );
  });
  
  it('The Manager logged in can get the number of trips managed', async () => {
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');
    const managerAuth = result.body.token;
    const res= await chai
      .request(app)
      .get(`/api/v1/trip/statistics?start=${start}&end=${end}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res.body).to.have.property('status', 200);
    expect(res.body.data).to.have.property(
      'message',
      `You succesfully got all trips you have made between ${start} and ${end} succesfully`
    );
  });
  it('User can get the statistics of recent days', async () => {
    const period = 'day';
    const number = 10;
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');
    const managerAuth = result.body.token;
    const res= await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.property('status', 200);
    expect(res.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('User can get the statistics of recent weeks', async () => {
    const period = 'week';
    const number = 1;
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');
    const managerAuth = result.body.token;
    const res= await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.property('status', 200);
    expect(res.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('User can get the statistics of recent months', async () => {
    const period = 'month';
    const number = 1;
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');
    const managerAuth = result.body.token;
    const res = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.property('status', 200);
    expect(res.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('User can get the statistics of recent years', async () => {
    const period = 'year';
    const number = 1;
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');
    const managerAuth = result.body.token;
    const res = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.property('status', 200);
    expect(res.body.data).to.have.property(
      'message',
      `You succesfully got all trips you made ${number} ${period} ago`
    );
  });
  it('If User try period which does not exist user get message', async () => {
    const period = 'invalid';
    const number = 10;
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');
    const managerAuth = result.body.token;
    const res = await chai
      .request(app)
      .get(`/api/v1/trip/statistics/recent?period=${period}&number=${number}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.property('status', 400);
    expect(res.body).to.have.property('message', 'Put valid period');
  });
});
