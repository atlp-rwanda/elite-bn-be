import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);

let userToken, othersToken;
const newUser = {
  firstName: 'mao',
  lastName: 'jul',
  surname: 'ish',
  email: 'maojulish@you.com',
  password: '$2b$10$ub4Im2h9NLK06KByUNhbweM/SPgkJvmFYwrA2KFvz3JSgHK3K6sM.',
};
const otherUser = {
  firstName: 'other',
  lastName: 'user',
  surname: 'otherone',
  email: 'otheruser@you.com',
  password: '$2b$10$ub4Im2h9NLK06KByUNhbweM/SPgkJvmFYwrA2KFvz3JSgHK3K6sM.',
};
const credential = {
  email: 'maojulish@you.com',
  password: 'maojulish!123',
};

const othersCred = {
  email: 'otheruser@you.com',
  password: 'maojulish!123',
};

const profileInfo = {
  firstName: 'juli',
  lastName: 'ish',
  username: 'game6klay',
  gender: 'male',
  phone: '+230 435 923 123',
  birthdate: '24th jul 1990',
  nationality: 'Rwandase',
  preferredLanguage: 'Kinyarwanda',
  preferredCurrency: 'RWF',
  department: 'IT department',
  lineManager: 'kalisa',
  location: 'Kigali-Rwanda',
};



describe('USER PROFILE TEST ', () => {
  after(async () => {
    await Users.destroy({ where: { email: 'maojulish@you.com' } });
  });
  after(async () => {
    await Users.destroy({ where: { email: 'otheruser@you.com' } });
  });
  it('should get profile after login ', async () => {
    await Users.create(newUser);
    const result = await chai.request(app).post('/api/v1/user/login').send(credential);
    expect(result).to.have.property('status', 200);
    expect(result.body).to.have.property('status', 'success');
    expect(result.body).to.have.property('token');

    userToken = result.body.token;

    const res = await chai
      .request(app)
      .get('/api/v1/user/profile')
      .set('Cookie', `jwt=${userToken}`);
    expect(res).to.have.property('status', 200);
    expect(res.body).to.have.property('message', 'my profile');
  });

  it('Should  successfully logout', async () => {
    const result = await chai.request(app).post('/api/v1/user/logout');
    expect(result).to.have.property('status', 200);
    expect(result.body).to.have.property('status', 'success');
  });

  
  it('should not get others Profile', async () => {
    
    
    const result = await chai.request(app).post('/api/v1/user/login').send(othersCred);
   
    othersToken = result.body.token;

    const profileRes = await chai
      .request(app)
      .get('/api/v1/user/profile')
      .set('Cookie', `jwt=${othersToken}`)
      .send(profileInfo);
    expect(profileRes).to.have.status(401);
  });

  it('should update Profile', async () => {
    const result = await chai.request(app).post('/api/v1/user/login').send(credential);
    userToken = result.body.token;
    const profileRes = await chai
      .request(app)
      .patch('/api/v1/user/profile')
      .set('Cookie', `jwt=${userToken}`)
      .send(profileInfo);
    expect(profileRes).to.have.status(200);
  });

  it('Should  successfully logout', async () => {
    const result = await chai.request(app).post('/api/v1/user/logout');
    expect(result).to.have.property('status', 200);
    expect(result.body).to.have.property('status', 'success');
  });

  it('should not update others Profile', async () => {
    const res = await chai.request(app).post('/api/v1/user/login').send(othersCred);
    othersToken = res.body.token; 


    const profileRes = await chai
      .request(app)
      .patch('/api/v1/user/profile')
      .set('Cookie', `jwt=${othersToken}`)
      .send(profileInfo);
    expect(profileRes).to.have.status(401);
  });
});

