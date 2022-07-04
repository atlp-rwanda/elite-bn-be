import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';
import models from '../src/database/models';
import bcrypt from 'bcrypt';

const { Users } = models;
chai.should();

use(chaiHttp);

let adminAuth; 
let adminUnauth;
const loginAdmin = {
  email: 'kikolulu@gmail.com',
  password: 'kikolulu@123'
};

const notSuperAdmin = {
  email: 'kakamao@gmail.com',
  password: 'kakamao@1234'
}

describe('TEST ROLES.', () => {
  after(async () => {
    await Users.destroy({ where: { email: 'kakamao@gmail.com' } });
  });
  after(async () => {
    await Users.destroy({ where: { email: 'kikolulu@gmail.com' } });
  });

  it('should login as normal user not super admin', async () => {
    const res = await request(app)
      .post('/api/v1/user/login')
      .send(notSuperAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('message', 'User logged in successfully');

    adminUnauth = res.body.token;
  
  });

  it('should not be allowed to change user role', async () => {
    const email = 'kakamao@gmail.com'
    const updateRole = { userEmail: email, userRole: 'manager'};

    const res = await request(app)
      .patch('/api/v1/user/role')
      .set('Cookie', `jwt=${adminUnauth}`)
      .send(updateRole);
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('error', 'You are not super admin');
  });

  it('should login as super administrator', async () => {
    const res = await request(app)
      .post('/api/v1/user/login')
      .send(loginAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('message', 'User logged in successfully');

    adminAuth = res.body.token;
  
  });
  it('should be allowed to get all registed user', async() =>{
    const res = await request(app)
    .get('/api/v1/user/allUser')
    .set('Cookie', `jwt=${adminAuth}`)
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'All registed user accounts');
  });

  it('should return user doesn\'t exist for unregested email', async () => {
    const updateRole = { userEmail: 'benymcauth@gmail.com', userRole: 'manager'};

    const res = await request(app)
      .patch('/api/v1/user/role')
      .set('Cookie', `jwt=${adminAuth}`)
      .send(updateRole);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'This user\'s email doesn\'t exist');
  });

  it('should return bad request for inexistent user role', async () => {
    const email = 'kakamao@gmail.com'
    const updateRole = { userEmail: email, userRole: 'super travel'};

    const res = await request(app)
      .patch('/api/v1/user/role')
      .set('Cookie', `jwt=${adminAuth}`)
      .send(updateRole);
    expect(res).to.have.status(400);
  });

  it('should be allowed to change user role', async () => {
    const email = 'kakamao@gmail.com'
    const updateRole = { userEmail: email, userRole: 'manager'};

    const res = await request(app)
      .patch('/api/v1/user/role')
      .set('Cookie', `jwt=${adminAuth}`)
      .send(updateRole);
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'User role successfully updated!');
  });
});

