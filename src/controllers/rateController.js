import { Op } from 'sequelize';
import models from '../database/models';
import applicationErr from '../utils/errors/applicationError';

export const createRate = async (req, res, next) => {
  try {
    const { tripRequestId, serviceRating } = req.body;

    const tripRequesst = await models.tripRequest.findOne({
      where: {
        id: tripRequestId,
        tripperId: {
          [Op.and]: [`${req.user.id}`],
        },
      },
    });
    if (!tripRequesst) {
      return next(
        new applicationErr("This trip request doesn't either exist or belong to you", 404)
      );
    }

    if (tripRequesst.tripStatus != 'approved') {
      return next(new applicationErr('This trip request is not approved', 401));
    }

    let date = new Date();
    const currentDateIso = date.toISOString().split('T')[0];

    if (tripRequesst.departDate >= currentDateIso) {
      return next(new applicationErr("You can't rate before 24hours, please wait", 401));
    }
    const isItRated = await models.Rates.findOne({
      where: { tripperId: req.user.id, accommodationId: tripRequesst.accommodationId },
    });
    if (isItRated) {
      const updateRate = await models.Rates.update(
        {
          serviceRating,
        },
        {
          where: {
            accommodationId: tripRequesst.accommodationId,
            tripperId: {
              [Op.and]: [`${req.user.id}`],
            },
          },
        }
      );
      return res.status(201).json({
        message: 'accommodation rated',
        data: updateRate,
      });
    } else {
      const userRates = await models.Rates.create({
        tripperId: req.user.id,
        accommodationId: tripRequesst.accommodationId,
        serviceRating,
      });

      return res.status(201).json({ message: 'rates added to accomodation!', data: userRates });
    }
  } catch (error) {
    return next(new applicationErr('Fail to rate an accommodation', 500));
  }
};
