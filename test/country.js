import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.should();

use(chaiHttp);
const country = {
  name: 'Rwanda',
};

let travelAdminA, notTravelAdminT;

const travelAdmin = {
  email: 'kakamao@gmail.com',
  password: 'kakamao@1234',
};

const notTravelAdmin = {
  email: 'rickrob@gmail.com',
  password: 'rickrob@1234',
};

it('should login as travel admin', async () => {
  const res = await chai.request(app).post('/api/v1/user/login').send(travelAdmin);
  expect(res).to.have.status(200);
  expect(res.body).to.have.property('token');
  expect(res.body).to.have.property('message', 'User logged in successfully');

  travelAdminA = res.body.token;
});



describe('/country end points  ', () => {
  it('it should create a country', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/country/create')
      .set('Cookie', `jwt=${travelAdminA}`)
      .send(country);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
  });

  it('Should not login as travel admin', async () => {
  const res = await chai.request(app).post('/api/v1/user/login').send(notTravelAdmin);
  expect(res).to.have.status(200);
  expect(res.body).to.have.property('token');
  expect(res.body).to.have.property('message', 'User logged in successfully');

  notTravelAdminT = res.body.token;
});

  it('it should not allow to create a country', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/country/create')
      .set('Cookie', `jwt=${notTravelAdminT}`)
      .send(country);
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error', 'You are not travel admin');
  });

  it('It should get all countries', async () => {
    const res = await chai.request(app).get('/api/v1/country').send(country);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('all countries');
  });
});
