import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app.js';

chai.should();

chai.use(chaiHttp);

describe('/GET root endpoint', () => {
  it('it should GET root endpoint', (done) => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
