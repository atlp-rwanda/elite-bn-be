import Op from 'sequelize';
import models from '../database/models';
import catchAsync from '../utils/catchAsync';
import applicationErr from '../utils/errors/applicationError';
import * as notification from '../services/notificationService';
import { sendEmail } from '../utils/email';
import { sendEmailNotification } from '../views/emailNotification';
import { sendEmailUpdateNotification } from '../views/email/emailNotificationUpdate';

export const makeTrip = async (req, res, next) => {
  try {
    let type;
    if (req.body.returnDate !== '') {
      type = 'return trip';
    } else {
      type = 'one way';
    }

    const locationTo = await models.Location.findOne({ where: { id: req.body.to } });
    const accommodationT = await models.Accomodation.findOne({
      where: { id: req.body.accommodationId },
    });

    if (!locationTo) {
      return res.status(404).json({ message: 'location not found' });
    }
    if (!accommodationT) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    const tripReq = {
      tripperId: req.user.id,
      from: req.body.from,
      to: req.body.to,
      departDate: req.body.departDate,
      returnDate: req.body.returnDate,
      tripReasons: req.body.tripReasons,
      tripType: type,
      accommodationId: req.body.accommodationId,
    };
    const trip = await models.tripRequest.create(tripReq);
    const newNotification = {
      title: 'Create Trip Request was successful',
      message: 'A new Trip Made in Your Accomodation facility',
      type: 'application',
      tripId: trip.id,
      addedBy: req.user.id,
      category: 'created',
    };
    await notification.addTripStatusNotification(newNotification);
    await models.Users.findOne({ where: { email: `${req.user.email}` } });
    await models.Users.findOne({ where: { username: `${req.user.username}` } });

    sendEmail(
      req.user.email,
      process.env.SENDGRID_USERNAME,
      'Email Notification',
      sendEmailNotification(req.user.username)
    );
    return res.status(201).json({
      message: 'trip request created',
      tripReq,
    });
  } catch (err) {
    return next(new applicationErr('failed to make trip request', 500));
  }
};

export const getRequestedTrips = async (req, res, next) => {
  try {
    const freshUser = await models.Users.findByPk(req.user.id);
    const getTrip = await models.tripRequest.findAll({
      where: { tripperId: freshUser.id },
      include: [
        { model: models.Users, as: 'requester', attributes: ['firstName', 'lastName', 'email'] },
        { model: models.Location, as: 'destination', attributes: ['locationName'] },
        { model: models.Accomodation, as: 'accommodation', attributes: ['accomodationName'] },
      ],
      attributes: {
        exclude: ['tripperId', 'to', 'accommodationId', 'createdAt', 'updatedAt'],
      },
    });
    res.status(200).json({
      message: 'requested trips',
      getTrip,
    });
  } catch (error) {
    return next(new applicationErr('Fail to get trip request', 500));
  }
};

export const allTrips = async (req, res, next) => {
  try {
    const getAlltrips = await models.tripRequest.findAll({
      include: [
        { model: models.Users, as: 'requester', attributes: ['firstName', 'lastName', 'email'] },
        { model: models.Location, as: 'destination', attributes: ['locationName'] },
        { model: models.Accomodation, as: 'accommodation', attributes: ['accomodationName'] },
      ],
      attributes: {
        exclude: ['id', 'tripperId', 'to', 'accommodationId', 'createdAt', 'updatedAt'],
      },
    });
    res.status(200).json({
      message: 'All trip request',
      getAlltrips,
    });
  } catch (err) {
    return next(new applicationErr('Fail to get trip request', 500));
  }
};

export const updateTrip = async (req, res, next) => {
  const freshUser = await models.Users.findByPk(req.user.id);

  try {
    const isTripId = await models.tripRequest.findOne({ where: { id: req.params.tripId } });
    if (!isTripId) {
      return res.status(404).json({ message: 'Trip request NOT found' });
    }

    let type;
    if (req.body.returnDate !== '') {
      type = 'return trip';
    } else {
      type = 'one way';
    }
    const locationTo = await models.Location.findOne({ where: { id: req.body.to } });
    const accommodationT = await models.Accomodation.findOne({
      where: { id: req.body.accommodationId },
    });

    if (!locationTo) {
      return res.status(404).json({ message: 'location not found' });
    }
    if (!accommodationT) {
      return res.status(404).json({ message: 'Accommodation not found' });
    }

    const tripReq = {
      tripperId: req.user.id,
      from: req.body.from,
      to: req.body.to,
      departDate: req.body.departDate,
      returnDate: req.body.returnDate,
      tripReasons: req.body.tripReasons,
      tripType: type,
      accommodationId: req.body.accommodationId,
    };
    const updateTrip = await models.tripRequest.update(tripReq, {
      where: {
        id: req.params.tripId,
        tripperId: freshUser.id,
        tripStatus: 'pending',
      },
    });
    /** raise a notification for updating trip trequest */
    const newUpdating = {
      title: 'Trip Request Updated',
      message: 'Check for An Update To A Trip Made in Your Accomodation',
      type: 'application',
      tripId: req.params.tripId,
      addedBy: req.user.id,
      category: 'updated',
    };
    await notification.addTripStatusNotification(newUpdating);
    await models.Users.findOne({ where: { email: `${req.user.email}` } });
    await models.Users.findOne({ where: { username: `${req.user.username}` } });

    sendEmail(
      req.user.email,
      process.env.SENDGRID_USERNAME,
      'Email Trip Update Notification',
      sendEmailUpdateNotification(req.user.username)
    );
    res.status(200).json({
      message: 'Trip updated successfully',
      updateTrip,
    });
  } catch (error) {
    return next(new applicationErr('Fail to update trip request', 500));
  }
};

export const deleteTrip = async (req, res, next) => {
  const freshUser = await models.Users.findByPk(req.user.id);

  try {
    const deleteIt = await models.tripRequest.destroy({
      where: {
        id: req.params.tripId,
        tripperId: freshUser.id,
        tripStatus: 'pending',
      },
    });
    res.status(200).json({
      message: 'Trip deleted',
      deleteIt,
    });
  } catch (error) {
    return next(new applicationErr('Fail to delete a trip request', 500));
  }
};

export const mostTavelledDestinations = catchAsync(async (req, res, next) => {
  let allLocationsId = [];
  let allLocationsIdOccurrence = [];
  let returnedData = [];

  let trips = await models.tripRequest.findAll({ where: { tripStatus: 'approved' } });
  trips.map((trip) => allLocationsId.push(trip.to));

  let uniqueArray = allLocationsId.filter(function (item, pos) {
    return allLocationsId.indexOf(item) == pos;
  });

  function getOccurrence(array, value) {
    return array.filter((v) => v === value).length;
  }

  uniqueArray.sort().map((location) => {
    allLocationsIdOccurrence.push({
      locationId: location,
      locationOccurrence: getOccurrence(allLocationsId, location),
    });
  });
  let mostTravelledDest = allLocationsIdOccurrence.sort((a, b) =>
    a.locationOccurrence < b.locationOccurrence ? 1 : -1
  );

  const mtd = mostTravelledDest.map(async (dest) => {
    const location = await models.Location.findOne({
      where: { id: dest.locationId },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    location.dataValues.occurance = dest.locationOccurrence;
    returnedData.push(location.dataValues);
  });

  await Promise.all(mtd);
  return res.status(200).json({ status: 'success', data: returnedData });
});
export const createMultiTripRequest = async (req, res, next) => {
  const userRole = req.user.role;
  if (userRole !== 'requester') {
    return res.status(403).json({ message: 'Unauthorized to create trip request' });
  }
  const trips = req.body;
  let tripError;
  let tripAppError;

  const createTrips = trips.map(async (trip_) => {
    try {
      const accomodation = await models.Accomodation.findOne({
        where: { id: trip_.accommodationId },
      });
      let type;
      if (trip_.returnDate !== '') {
        type = 'return trip';
      } else {
        type = 'one way';
      }
      const location = await models.Location.findOne({
        where: { id: trip_.to },
      });

      if (!location) {
        return (tripError = 'Sorry, some locations can not be found!');
      }
      if (!accomodation) {
        return (tripError = 'Sorry, some accomodations can not be found!');
      }

      const tripReq = {
        tripperId: req.user.id,
        from: trip_.from,
        to: trip_.to,
        departDate: trip_.departDate,
        returnDate: trip_.returnDate,
        tripReasons: trip_.tripReasons,
        tripType: type,
        accommodationId: trip_.accommodationId,
      };

      await models.tripRequest.create(tripReq);
    } catch (error) {
      return (tripAppError = error);
    }
  });

  await Promise.all(createTrips);
  if (tripError) return next(new applicationErr(tripError, 404));
  if (tripAppError) return next(tripAppError);
  return res.status(201).json({
    status: 'success',
    message: 'All of your trips were successfully requested',
    trips,
  });
};
