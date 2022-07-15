import models from '../database/models';
import catchAsync from '../utils/catchAsync';
import applicationErr from '../utils/errors/applicationError';

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

    await models.tripRequest.create(tripReq);
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
    a.locationOccurrence < b.locationOccurrence ? 1 : -1,
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
