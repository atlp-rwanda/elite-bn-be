/*eslint-disable*/
import models from '../database/models';
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
