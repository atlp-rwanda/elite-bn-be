const internalServerError = async (message, res) => {
  res.status(500).json({ 'Error:': message, status: 500 });
};
const semanticError = async (message, res) => {
  res.status(422).json({  status: 422, Error: message });
};
const notFoundError = async (message, res) => {
  res.status(404).json({ status: 404, Error: message });
};
const validationError = async (message, res) => {
  res.status(400).json({ Error: message, status: 400 });
};
const notAcceptableError = async (message, res) => {
  res.status(406).json({ Error: message, status: 406 });
};
const badRequestError = async (message, res) => {
  res.status(400).json({ Error: message, status: 400 });
};
const AuthorizationError = async (message, res) => {
  res.status(401).json({ Error: message, status: 401 });
};
const unAuthorisedError = async (message, res) => {
  res.status(401).json({ Error: message, status: 401 });
};
export const databaseError = async (error, res) => {
  res.status(500).json({ status: 500, data: { error } });
};
export {
  internalServerError,
  notFoundError,
  validationError,
  AuthorizationError, unAuthorisedError, semanticError, badRequestError, notAcceptableError
};
