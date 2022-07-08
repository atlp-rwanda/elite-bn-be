import * as ApplicationError from '../utils/errors/applicatioErrors';
import { tripStatServices } from '../services';
import { successResponse } from '../utils/helpers/responseHandler';
import models from '../database/models';
export const tripStatistics = async (req, res) => {
 
  let { start } = req.query;
  let { end } = req.query;
  const startString = start;
  const endString = end;
  const isToday =
    new Date(end).toLocaleDateString() === new Date().toLocaleDateString();
  if (isToday) {
    end = new Date();
  } else {
    end = new Date(end);
    end.setDate(end.getDate() + 1);
  }
  start = new Date(start);
  const userRole = await models.Users.findByPk(req.user.id)
  const userId =req.user.id
  if (userRole.role !== 'requester' && userRole.role !== 'manager') {
 
    return res.status(404).json({
        message: 'Statistics of travel are  available for requester and Manager',
      });
  }
  const trips = await tripStatServices.countTrips(userId, start, end, userRole);
  if (trips?.count !== undefined) {
    return successResponse(
      res,
      200,
      `You succesfully got all trips you have made between ${startString} and ${endString} succesfully`,
      { trips: trips.count }
    );
  }
  return ApplicationError.internalServerError(`${trips?.error}`, res);
};
export const recentTripStatistic = async (req, res) => {
  const userId = req.user.id;
  let { period } = req.query;
  const { number } = req.query;
  period = period.toLowerCase();
  const end = new Date();
  const start = new Date();
  if (period === 'week' || period === 'weeks') {
    start.setDate(start.getDate() - 7 * number);
  } else if (period === 'day' || period === 'days') {
    start.setDate(start.getDate() - number);
  } else if (period === 'month' || period === 'months') {
    start.setMonth(start.getMonth() - number);
  } else if (period === 'year' || period === 'years') {
    start.setYear(start.getYear() - number);
  } else {
    return res.status(400).json({message:'Put valid period'});
  }
  const userRole = await models.Users.findByPk(req.user.id)
  if (userRole.role !== 'requester' && userRole.role !== 'manager') {
    return ApplicationError.internalServerError({ message: 'Statistics of travel are available for requester and Manager' }, res)
  }

  const trips = await tripStatServices.countTrips(userId, start, end, userRole);
  if (trips.count !== undefined) {
    return successResponse(
      res,
      200,
      `You succesfully got all trips you made ${number} ${period} ago`,
      { trips: trips.count }
    );
  }

  return ApplicationError.internalServerError(`${trips.error}`, res);
};

