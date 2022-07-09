const internalServerError = async (message, res) => {
  res.status(500).json({ 'Error:': message, status: 500 });
};
const semanticError = async (message, res) => {
  res.status(422).json({  status: 422, Error: message });
};
const notFoundError = async (message, res) => {
  res.status(404).json({ status: 404, Error: message });
};
const AuthorizationError = async (message, res) => {
  res.status(401).json({ Error: message, status: 401 });
};
const unAuthorisedError = async (message, res) => {
  res.status(401).json({ Error: message, status: 401 });
};
export {
  internalServerError, notFoundError, AuthorizationError, unAuthorisedError, semanticError
};
