import tripRequest from '../database/models/triprequest';
import models from '../database/models';

const searchByDestination = async (to) => {
  const results = await tripRequest.findAll({ where: { to } });
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByDeparture = async (from) => {
  const results = await tripRequest.findAll({ where: { from } });
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByStartDate = async (departDate) => {
  const results = await tripRequest.findAll({ where: { departDate } });
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByreturnDate = async (returnDate) => {
  const results = await tripRequest.findAll({ where: { returnDate } });
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByStatus = async (tripStatus) => {
  const results = await tripRequest.findAll({ where: { tripStatus } });
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

const searchByDepartureDestination = async (from, to) => {
  const results = await tripRequest.findAll({ where: { from, to } });
  if (!results || results.length === 0) {
    return null;
  }
  return results;
};

export {
  searchByDestination,
  searchByDeparture,
  searchByStartDate,
  searchByreturnDate,
  searchByStatus,
  searchByDepartureDestination,
};
