const internalServerError = async (message, res) => {
  res.status(500).json({ 'Error:': message });
};
const validationError = async (message, res) => {
  res.status(400).json({ Error: message });
};
export { internalServerError, validationError };
