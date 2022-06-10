import * as tripRequest from '../services/searchTripRequest';
import { notFoundError } from '../utils/errors/applicatioErrors';
import * as AppError from '../utils/errors/AppError';
import { successResponse } from '../utils/response';

const tripRequestSearch = async (req, res) => {
  if (req.query.from && req.query.to) {
    try {
      const { from, to } = req.query;
      const findTrips = await tripRequest.searchByDepartureDestination(from, to);
      if (findTrips) {
        return successResponse(res, 200, 'Trip Requests fetched', {
          trips: findTrips,
        });
      }
      return notFoundError({ data: { message: 'Not found, try again!' } }, res);
    } catch (error) {
      return AppError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.from) {
    try {
      const { from } = req.query;
      const findTrips = await tripRequest.searchByDeparture(from);
      if (findTrips) {
        return successResponse(res, 200, 'Trip Requests fetched', {
          trips: findTrips,
        });
      }
      return notFoundError({ data: { message: 'Not found, try again!' } }, res);
    } catch (error) {
      return AppError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.to) {
    try {
      const { to } = req.query;
      const findTrips = await tripRequest.searchByDestination(to);
      if (findTrips) {
        return successResponse(res, 200, 'Trip Requests fetched', {
          trips: findTrips,
        });
      }
      return notFoundError({ data: { message: 'Not found, try again!' } }, res);
    } catch (error) {
      return AppError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.departDate) {
    try {
      const findTrips = await tripRequest.searchByStartDate(req.query.departDate);
      if (findTrips) {
        return successResponse(res, 200, 'Trip Requests fetched', {
          trips: findTrips,
        });
      }
      return notFoundError({ data: { message: 'Not found, try again!' } }, res);
    } catch (error) {
      return AppError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.returnDate) {
    try {
      const findTrips = await tripRequest.searchByreturnDate(req.query.returnDate);
      if (findTrips) {
        return successResponse(res, 200, 'Trip Requests fetched', {
          trips: findTrips,
        });
      }
      return notFoundError({ data: { message: 'Not found, try again!' } }, res);
    } catch (error) {
      return AppError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  if (req.query.tripStatus) {
    try {
      const findTrips = await tripRequest.searchByStatus(req.query.tripStatus);
      if (findTrips) {
        return successResponse(res, 200, 'Trip Requests fetched', {
          trips: findTrips,
        });
      }
      return notFoundError({ data: { message: 'Not found, try again!' } }, res);
    } catch (error) {
      return AppError.internalServerError(
        { data: { message: `Error: ${error} ,try again!` } },
        res
      );
    }
  }

  return notFoundError({ data: { message: 'Not found, try again!' } }, res);
};

export { tripRequestSearch };
