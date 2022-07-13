import chai, { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import { Country, Users } from '../src/database/models';

chai.should();

use(chaiHttp);

let locationId, accomodationId, roomId, travelAdminA, notTravelAdminT, tripperA, managerAuth;
const tripId = 1;

const travelAdmin = {
  email: 'kakamao@gmail.com',
  password: 'kakamao@1234',
};

const notTravelAdmin = {
  email: 'kikolulu@gmail.com',
  password: 'kikolulu@123',
};

const tripper = {
  firstName: 'useme',
  lastName: 'fortest',
  surname: 'tripper',
  email: 'tripper@elite.com',
  password: '$2a$12$OkrGEhmd4qXHgY694JQPe.pp0ZaxIwshuJ.0bQS/z3SxmXtQxGNVy',
};

const tripperCred = {
  email: 'tripper@elite.com',
  password: 'testme123',
};

describe('/CRUD location, accommodation, rooms...  ', () => {
  it('should login as travel admin', async () => {
    const res = await chai.request(app).post('/api/v1/user/login').send(travelAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('message', 'User logged in successfully');

    travelAdminA = res.body.token;
  });

  it('Should not login as travel admin', async () => {
    const res = await chai.request(app).post('/api/v1/user/login').send(notTravelAdmin);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('message', 'User logged in successfully');

    notTravelAdminT = res.body.token;
  });

  it('It should create location', async () => {
    const country = await Country.create({ name: 'Rwanda' });
    const res = await chai
      .request(app)
      .post('/api/v1/location/create')
      .set('Cookie', `jwt=${travelAdminA}`)
      .send({
        locationName: 'kigali',
        locationDescription: 'branch',
        countryId: country.id,
        currency: 'Rwf',
        link: 'link',
      });
    expect(res).to.have.status(201);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Location added successfully');

    locationId = res.body.payload.id;
  });

  it('It should not create location', async () => {
    const country = await Country.create({ name: 'Swatini' });
    const res = await chai
      .request(app)
      .post('/api/v1/location/create')
      .set('Cookie', `jwt=${notTravelAdminT}`)
      .send({
        locationName: 'kigali',
        locationDescription: 'branch',
        countryId: country.id,
        currency: 'Rwf',
        link: 'link',
      });
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
  });

  it('It should create an accommodation', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/accomodation/create')
      .set('Cookie', `jwt=${travelAdminA}`)
      .send({
        accomodationName: 'hehe',
        accomodationDescription: 'kiyovu',
        locationId,
        accomodationImage: [
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/pwaeh8da2y8fefi6npkj.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659047/elite/aphojpf91gtm1qloyw2y.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659050/elite/jgs6nree61qgopbwi0ly.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/ycsnx8f2xjftaoed7usf.webp',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659049/elite/e8f5hp2lcum6pi5d5tmo.jpg',
        ],
        amenities: ['wifi', 'long', 'late'],
        longitude: 'long',
        latitude: 'late',
      });
    expect(res).to.have.status(201);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Accommodation added successfully');

    accomodationId = res.body.payload.id;
  });
  it('It should create an  ROOM', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/room/create')
      .set('Cookie', `jwt=${travelAdminA}`)
      .send({
        accomodationId,
        roomNumber: 'G12',
        bedType: 'king size bed ',
        currency: 'Rwf',
        cost: 2.5,
      });
    expect(res).to.have.status(201);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Room added successfully');
    roomId = res.body.payload.id;
  });
  it('It should get location by Id', async () => {
    const res = await chai.request(app).get(`/api/v1/location/${locationId}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('location retrieved successfully');
  });
  it('It should update location ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/location/update/${locationId}`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('location updated successfully');
  });
  it('It should get accomodation by Id', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}`)
      .send({
        accomodationName: 'hehe',
        accomodationDescription: 'kiyovu',
        locationId,
        accomodationImage: [
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/pwaeh8da2y8fefi6npkj.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659047/elite/aphojpf91gtm1qloyw2y.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659050/elite/jgs6nree61qgopbwi0ly.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/ycsnx8f2xjftaoed7usf.webp',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659049/elite/e8f5hp2lcum6pi5d5tmo.jpg',
        ],
        amenities: ['wifi', 'long', 'late'],
        longitude: 'long',
        latitude: 'late',
      });
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Accommodation found');
  });
  it('It should get all accomodations', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/accomodation')
      .send({
        accomodationName: 'hehe',
        accomodationDescription: 'kiyovu',
        locationId,
        accomodationImage: [
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/pwaeh8da2y8fefi6npkj.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659047/elite/aphojpf91gtm1qloyw2y.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659050/elite/jgs6nree61qgopbwi0ly.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/ycsnx8f2xjftaoed7usf.webp',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659049/elite/e8f5hp2lcum6pi5d5tmo.jpg',
        ],
        amenities: ['wifi', 'long', 'late'],
        longitude: 'long',
        latitude: 'late',
      });
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('These are all the accommodations');
  });
  it('It should get all rooms', async () => {
    const res = await chai.request(app).get('/api/v1/room').send({
      accomodationId,
      roomNumber: 'G12',
      bedType: 'king size bed ',
      currency: 'Rwf',
      cost: 2,
    });
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('All rooms in given accommodation');
  });
  it('It should get room by Id', async () => {
    const res = await chai.request(app).get(`/api/v1/room/${roomId}`).send({
      accomodationId,
      roomNumber: 'G12',
      bedType: 'king size bed ',
      currency: 'Rwf',
      cost: 2,
    });
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Room found');
  });
  it('It should update room ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/room/update/${roomId}`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Room updated successfully');
  });
  it('It should not update room ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/room/update/${roomId}`)
      .set('Cookie', `jwt=${notTravelAdminT}`);
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('error');
  });
  it('It should update Accomodation ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/accomodation/update/${accomodationId}`)
      .set('Cookie', `jwt=${travelAdminA}`)
      .send({
        accomodationName: 'hehe',
        accomodationDescription: 'kiyovu',
        locationId,
        accomodationImage: [
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/pwaeh8da2y8fefi6npkj.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659047/elite/aphojpf91gtm1qloyw2y.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659050/elite/jgs6nree61qgopbwi0ly.jpg',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659048/elite/ycsnx8f2xjftaoed7usf.webp',
          'http://res.cloudinary.com/elite-team/image/upload/v1655659049/elite/e8f5hp2lcum6pi5d5tmo.jpg',
        ],
        amenities: ['wifi', 'long', 'late'],
        longitude: 'long',
        latitude: 'late',
      });
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('accommodation updated successfully');
  });

  it('It should update location ', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/location/update/${locationId}`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('location updated successfully');
  });
});

describe('TRIP request TEST... ', () => {
  it('should make trip request', async () => {
    await Users.create({ ...tripper });

    const result = await chai.request(app).post('/api/v1/user/login').send(tripperCred);
    expect(result.body).to.have.property('token');

    tripperA = result.body.token;

    const res = await chai
      .request(app)
      .post('/api/v1/trip/create')
      .set('Cookie', `jwt=${tripperA}`)
      .send({
        from: 'Kanombe',
        to: locationId,
        departDate: '2022-07-07',
        returnDate: '2022-08-08',
        tripReasons: 'trip request reason',
        accommodationId: accomodationId,
      });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'trip request created');
    expect(res.body).to.have.property('tripReq');
  });

  it('should get requested trip', async () => {
    const res = await chai.request(app).get('/api/v1/trip').set('Cookie', `jwt=${tripperA}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'requested trips');
  });

  it('should get all requested trip as manager', async () => {
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');

    managerAuth = result.body.token;

    const res = await chai
      .request(app)
      .get('/api/v1/trip/allTrips')
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'All trip request');
  });
  it('Manager should be able to reject trip request', async () => {
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');

    const managerAuth = result.body.token;

    const res = await chai
      .request(app)
      .patch(`/api/v1/request/reject/${tripId}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('response');
    expect(res.body.response).to.equal('request rejected successfully');

  })
  it('Manager should  not be able to reject approved trip request', async () => {
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');

    const managerAuth = result.body.token;

    const res = await chai
      .request(app)
      .patch(`/api/v1/request/reject/${tripId}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.status(401);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('response');

  })

  it('Manager should  approve rejected request', async () => {
    const managerLogin = { email: 'rickrob@gmail.com', password: 'rickrob@1234' };
    const result = await chai.request(app).post('/api/v1/user/login').send(managerLogin);
    expect(result.body).to.have.property('token');

    const managerAuth = result.body.token;

    const res = await chai
      .request(app)
      .patch(`/api/v1/request/approve/${tripId}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('response');
    expect(res.type).to.equal('application/json');

  });

  it('should not update a inexistent trip request', async () => {
    const inexTripId = 234;
    const res = await chai
      .request(app)
      .patch(`/api/v1/trip/update/${inexTripId}`)
      .set('Cookie', `jwt=${tripperA}`)
      .send({
        from: 'Not found trip',
        to: locationId,
        departDate: '2022-05-07',
        returnDate: '2022-09-28',
        tripReasons: 'trip is updated trip request',
        accommodationId: accomodationId,
      });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'Trip request NOT found');
  });

  it('should update a pending trip request', async () => {
    const res = await chai
      .request(app)
      .patch(`/api/v1/trip/update/${tripId}`)
      .set('Cookie', `jwt=${tripperA}`)
      .send({
        from: 'Kabeza',
        to: locationId,
        departDate: '2022-05-07',
        returnDate: '2022-09-28',
        tripReasons: 'trip is updated trip request',
        accommodationId: accomodationId,
      });
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Trip updated successfully');
  });
});

describe('TEST comment on Trip Request... ', () => {
  const InexistTripId = 1447;
  const commentId = 1;
  const commentIdTwo = 2;
  const commentIdThree = 3;
  it('should not allow to Comment on, Get, Delete a comment on an inexistent trip request', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/trip/${InexistTripId}/comment`)
      .set('Cookie', `jwt=${tripperA}`)
      .send({ comment: 'Trip request Not found' });
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'Trip request Not found');
  });

  it('should comment on his/her trip request', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/trip/${tripId}/comment`)
      .set('Cookie', `jwt=${tripperA}`)
      .send({ comment: 'Hi this is my comment on my trip request' });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Comment saved successfully');
    expect(res.body).to.have.property('tripComment');
  });

  it('should reply on any comment as Manager or Super Admin', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/trip/${tripId}/comment`)
      .set('Cookie', `jwt=${managerAuth}`)
      .send({ comment: 'Hi this is my reply am your manager' });
    expect(res).to.have.status(201);
    expect(res.body).to.have.property('message', 'Comment saved successfully');
    expect(res.body).to.have.property('tripComment');
  });

  it('should not be allowed to comment on others trip except Manager or Super Admin', async () => {
    const res = await chai
      .request(app)
      .post(`/api/v1/trip/${tripId}/comment`)
      .set('Cookie', `jwt=${travelAdminA}`)
      .send({ comment: 'Hi this is must not be allowed cz am travel admin' });
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message', 'You are unauthorized on this comment section');
  });

  it('should get all comments on trip request', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/trip/${tripId}/comments`)
      .set('Cookie', `jwt=${tripperA}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'All comment on this trip request');
    expect(res.body).to.have.property('tripComment');
  });

  it('should get all comments and replies as Manager or Super Admin', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/trip/${tripId}/comments`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'All comment on this trip request');
    expect(res.body).to.have.property('tripComment');
  });

  it('should not be allowed to get others comments except Manager or Super Admin', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/trip/${tripId}/comments`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message', 'You are unauthorized on this comment section');
  });

  it('should not allow to Delete an inexistent comment', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/trip/comment/${InexistTripId}`)
      .set('Cookie', `jwt=${tripperA}`);
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'Commnet on trip request Not found');
  });

  it('should be allowed to delete any comment as Manager or Super Admin', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/trip/comment/${commentId}`)
      .set('Cookie', `jwt=${managerAuth}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'comment on trip deleted');
    expect(res.body).to.have.property('deleteComm');
  });

  it('should not be allowed to delete others comments except Manager or Super Admin', async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/trip/${tripId}/comment`)
      .set('Cookie', `jwt=${tripperA}`)
      .send({ comment: 'Hi this is my second comment' });
    expect(result).to.have.status(201);

    const res = await chai
      .request(app)
      .delete(`/api/v1/trip/comment/${commentIdTwo}`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(401);
    expect(res.body).to.have.property('message', "You're Unauthorized to delete this comment");
  });

  it('should be allowed to delete his/her own comments', async () => {
    const result = await chai
      .request(app)
      .post(`/api/v1/trip/${tripId}/comment`)
      .set('Cookie', `jwt=${tripperA}`)
      .send({ comment: 'Hi this is my third comment' });
    expect(result).to.have.status(201);

    const res = await chai
      .request(app)
      .delete(`/api/v1/trip/comment/${commentIdThree}`)
      .set('Cookie', `jwt=${tripperA}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'comment on trip deleted');
    expect(res.body).to.have.property('deleteComm');
  });
});

const Requester = {
  email: 'test@gmail.com',
  password: '12@eLOvr',
};

let token = 0;

describe('Like tests ', () => {
  it('should login as requster', async () => {
    const res = await chai.request(app).post('/api/v1/user/login').send(Requester);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('token');
    expect(res.body).to.have.property('message', 'User logged in successfully');

    token = res.body.token;
  });

  it('Should like an accommodation', async () => {
    const response = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/like`)
      .set('Cookie', `jwt=${token}`);
    expect(response).to.have.property('status', 201);
    expect(response).to.have.property('body');
  });

  it('Should not like a unexistent accommodation', async () => {
    const response = await chai
      .request(app)
      .post('/api/v1/accomodation/767598/like')
      .set('Cookie', `jwt=${token}`);
    expect(response).to.have.property('status', 404);
    expect(response).to.have.property('body');
  });
  it('Should unlike the accomodation that previously liked', async () => {
    const response = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/like`)
      .set('Cookie', `jwt=${token}`);
    expect(response).to.have.property('status', 200);
    expect(response).to.have.property('body');
  });
  it('Should get all likes of an accommodation', async () => {
    const response = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}/likes`);
    expect(response).to.have.property('status', 200);
  });
  it('Should not get likes if an accommodations does not exist', async () => {
    const res = await await chai.request(app).get('/api/v1/accomodation/123456/like');
    expect(res).to.have.property('status', 404);
  });
  it('Should not get likes when there is no likes on an accommodation', async () => {
    const response = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}/like`)
      .set('Cookie', `jwt=${travelAdminA}`);

    expect(response).to.have.property('status', 404);
    expect(response).to.have.property('body');
  });

  it('Should dislike an accommodation', async () => {
    const response = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/dislike`)
      .set('Cookie', `jwt=${token}`);
    expect(response).to.have.property('status', 201);
    expect(response).to.have.property('body');
  });

  it('Should remove dislike', async () => {
    const response = await chai
      .request(app)
      .post(`/api/v1/accomodation/${accomodationId}/dislike`)
      .set('Cookie', `jwt=${token}`);
    expect(response).to.have.property('status', 200);
    expect(response).to.have.property('body');
  });

  it('Should get all dislikes for an accommodation', async () => {
    const response = await chai
      .request(app)
      .get(`/api/v1/accomodation/${accomodationId}/dislikes`)
      .set('Cookie', `jwt=${token}`);
    expect(response).to.have.property('status', 200);
  });
  it('Should not get dislikes when there is no dislike', async () => {
    const res = await chai.request(app).get(`/api/v1/accomodation/${accomodationId}/dislikes`);

    expect(res).to.have.property('status', 200);
  });
});

describe('Delete tests ', () => {
  it('It should delete  room ', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/room/delete/${roomId}`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('Room deleted successfully');
  });

  it('It should delete  Accomodation ', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/accomodation/delete/${roomId}`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('accommodation deleted successfully');
  });
  const Requester = {
    email: 'test@gmail.com',
    password: '12@eLOvr',
  };

  it('It should delete  location ', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/location/delete/${locationId}`)
      .set('Cookie', `jwt=${travelAdminA}`);
    expect(res).to.have.status(200);
    expect(res.type).to.equal('application/json');
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.equal('location deleted successfully');
  });

  it('should delete a pending trip request', async () => {
    const res = await chai
      .request(app)
      .delete(`/api/v1/trip/delete/${tripId}`)
      .set('Cookie', `jwt=${tripperA}`);
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message', 'Trip deleted');
  });
});
