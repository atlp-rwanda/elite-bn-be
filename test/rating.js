// import { describe, it, beforeEach, afterEach } from 'mocha';
// import chaiHTTP from 'chai-http';
// import chai, { expect } from 'chai';
// import { Users, Trips } from '../src/database/models';
// import app from '../src/app';

// chai.use(chaiHTTP);
// let today = new Date();

// describe('Rating test ', () => {
//   beforeEach(async () => {
//     await Users.destroy({ where: { email: 'random@gmail.com' } });
//   });

//   afterEach(async () => {
//     await Users.destroy({ where: { email: 'random@gmail.com' } });
//   });
//   const trip = {
//     departure: 'Huye',
//     destination: 'Kigali',
//     dateOfTravel: today.setDate(new Date().getDate() + 1),
//     dateOfReturn: today.setDate(new Date().getDate() + 2),
//     accomodationId: 2,
//     travelReason: 'This is travel reason in test'
//   };
//   const randomUser = {
//     email: 'random@gmail.com',
//     firstname: 'Random',
//     lastname: 'Person',
//     password: '$2a$12$qFP7wTRyEEclEjdoDA9OBOV3xDorty5aaE.nEy2lCRQwgVOdp1lIq',
//     isVerified: true
//   };
//   const credentials = {
//     email: 'random@gmail.com',
//     password: 'pswd123'
//   };
//   let token = 0;
//   const accomodationId = 2;
//   it('When there is no accomodation, it is impossible to rate it', async () => {
//     await Users.create({ ...randomUser });
//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     const res2 = await chai
//       .request(app)
//       .post(`/api/v1/accommodations/767598/rating`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ serviceRating: 5 });
//     expect(res2).to.have.property('status', 404);
//     expect(res2).to.have.property('body');
//     expect(res2.body).to.have.property(
//       'Error',
//       'That accomodation does not exist'
//     );
//   });
//   it('Only authenticated users should be able to provide ratings', async () => {
//     const user = await Users.create({ ...randomUser });

//     await Trips.create({
//       ...trip,
//       userId: user.id,
//       accomodationId: accomodationId,
//       status: 'approved'
//     });
//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     const res2 = await chai
//       .request(app)
//       .post(`/api/v1/accommodations/${accomodationId}/rating`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ serviceRating: 5 });
//     expect(res2).to.have.property('status', 201);
//     expect(res2).to.have.property('body');
//     expect(res2.body.data).to.have.property(
//       'message',
//       `You have rated accomodation with id ${accomodationId} with 5 stars`
//     );
//   });
//   it('Users who are not authenticated should not be able to provide ratings', async () => {
//     await Users.create({ ...randomUser });

//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     const res2 = await chai
//       .request(app)
//       .post(`/api/v1/accommodations/${accomodationId}/rating`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ serviceRating: 5 });
//     expect(res2).to.have.property('status', 401);
//     expect(res2.body).to.have.property(
//       'Error',
//       'You had not been to this accomodation. You can not rate it'
//     );
//   });
//   it('Only authenticated users should be able to update his/her ratings in accomodation', async () => {
//     const user = await Users.create({ ...randomUser });

//     await Trips.create({
//       ...trip,
//       userId: user.id,
//       accomodationId: accomodationId,
//       status: 'approved'
//     });
//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     await chai
//       .request(app)
//       .post(`/api/v1/accommodations/${accomodationId}/rating`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ serviceRating: 5 });
//     const res2 = await chai
//       .request(app)
//       .post(`/api/v1/accommodations/${accomodationId}/rating`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ serviceRating: 5 });
//     expect(res2).to.have.property('status', 200);
//     expect(res2).to.have.property('body');
//     expect(res2.body.data).to.have.property(
//       'message',
//       `You have updated ratings of accomodation with id ${accomodationId} to 5 stars`
//     );
//   });
//   it('Only authenticated users should be able to see classification of ratings of an accomodation', async () => {
//     const user = await Users.create({ ...randomUser });

//     await Trips.create({
//       ...trip,
//       userId: user.id,
//       accomodationId: accomodationId,
//       status: 'approved'
//     });
//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     await chai
//       .request(app)
//       .post(`/api/v1/accommodations/${accomodationId}/rating`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ serviceRating: 5 });
//     const res2 = await chai
//       .request(app)
//       .get(`/api/v1/accommodations/${accomodationId}/getratings`);
//     expect(res2).to.have.property('status', 200);
//     expect(res2).to.have.property('body');
//     expect(res2.body.data).to.have.property(
//       'message',
//       `Ratings of accomodation ${accomodationId}`
//     );
//   });
//   it('Only authenticated users should be able to get average ratings in the accomodation facility', async () => {
//     const user = await Users.create({ ...randomUser });

//     await Trips.create({
//       ...trip,
//       userId: user.id,
//       accomodationId: accomodationId,
//       status: 'approved'
//     });
//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     await chai
//       .request(app)
//       .post(`/api/v1/accommodations/${accomodationId}/rating`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ serviceRating: 5 });
//     const res2 = await chai
//       .request(app)
//       .get(`/api/v1/accommodations/${accomodationId}/rating`);
//     expect(res2).to.have.property('status', 200);
//     expect(res2).to.have.property('body');
//     expect(res2.body.data).to.have.property(
//       'message',
//       `Ratings of accomodation ${accomodationId}`
//     );
//   });
//   it('When no ratings made, Only authenticated users should be able to see that there is no average of ratings', async () => {
//     const res2 = await chai
//       .request(app)
//       .get(`/api/v1/accommodations/${accomodationId}/rating`);
//     expect(res2).to.have.property('status', 200);
//     expect(res2).to.have.property('body');
//     expect(res2.body.data).to.have.property(
//       'message',
//       'No ratings for this accomodation'
//     );
//   });
//   it('Only authenticated users can not get the ratings of accomodation which does not exist', async () => {
//     await Users.create({ ...randomUser });
//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     const res2 = await chai
//       .request(app)
//       .get(`/api/v1/accommodations/767598/rating`);
//     expect(res2).to.have.property('status', 404);
//     expect(res2).to.have.property('body');
//     expect(res2.body).to.have.property(
//       'Error',
//       'That accomodation does not exist'
//     );
//   });
//   it('When no ratings made, Only authenticated users should be able to see that there is no classification of ratings ', async () => {
//     const res = await chai
//       .request(app)
//       .get(`/api/v1/accommodations/${accomodationId}/getratings`);
//     expect(res).to.have.property('status', 200);
//     expect(res).to.have.property('body');
//     expect(res.body.data).to.have.property(
//       'message',
//       'No ratings for this accomodation'
//     );
//   });
//   it('Only authenticated users  can not access to classification of rating in accomodation unless there exist one', async () => {
//     await Users.create({ ...randomUser });
//     const res = await chai
//       .request(app)
//       .post('/api/user/login')
//       .send({ ...credentials });
//     token = res.body.accessToken;
//     const res2 = await chai
//       .request(app)
//       .get(`/api/v1/accommodations/767598/getratings`);
//     expect(res2).to.have.property('status', 404);
//     expect(res2).to.have.property('body');
//     expect(res2.body).to.have.property(
//       'Error',
//       'That accomodation does not exist'
//     );
//   });
// });
    