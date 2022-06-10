import { describe, it, beforeEach, afterEach } from 'mocha';
import chaiHTTP from 'chai-http';
import chai, { expect } from 'chai';
import { Users } from '../src/database/models';
import app from '../src/app';

chai.use(chaiHTTP);

describe("Simple test",()=>{
    it('Should add two numbers', done => {
        const number = 1 + 4
        expect(number).to.equal(5);
        done();
    })
})

describe('user login Test ', () => {
    beforeEach(async () => {
      await Users.destroy({ where: { email: 'usertest@gmail.com' } });
    });
  
    afterEach(async () => {
      await Users.destroy({ where: { email: 'usertest@gmail.com' } });
    });
  
    const userToTest = {
      firstName: 'useme',
      lastName: 'fortest',
      email: 'usertestme@gmail.com',
      password: '$2a$12$OkrGEhmd4qXHgY694JQPe.pp0ZaxIwshuJ.0bQS/z3SxmXtQxGNVy',
    };
    const loggedUser = {
      email: 'usertestme@gmail.com',
      password: 'testme123'
    };
    it('should return empty when there is empty email or password', async () => {
      await Users.create({...userToTest});
      const res = await chai
        .request(app)
        .post('/api/v1/user/login')
  
      expect(res).to.have.property('status', 400);
      expect(res).to.have.property('body');
    });
    
    it('should return wrong email or password when email incorrect', async () => {
      await Users.create(userToTest);
      const res = await chai
        .request(app)
        .post('/api/v1/user/login')
        .send({ ...loggedUser, email: 'notuser@gmail.com' });
      expect(res).to.have.property('status', 401);
      expect(res).to.have.property('body');
    });
    
    it('should return wrong email or password when password is incorrect', async () => {
      await Users.create(userToTest);
      const res = await chai
        .request(app)
        .post('/api/v1/user/login')
        .send({ ...loggedUser, password: 'fakepsw33' });
  
      expect(res).to.have.property('status', 401);
      expect(res).to.have.property('body');
    });
  
    it('should login when both email and password are correct', async () => {
      await Users.create(userToTest);
  
      const res = await chai
        .request(app)
        .post('/api/v1/user/login')
        .send(loggedUser);
      expect(res).to.have.property('status', 201);
      expect(res).to.have.property('body');
      expect(res.body).to.have.property('status', 'success');
      expect(res.body).to.have.property('message', 'User logged in successfully');
      expect(res.body).to.have.property('token');
    });
  });
