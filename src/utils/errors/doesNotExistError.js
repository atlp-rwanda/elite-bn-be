const userDoesNotExist = async (message, res) => {
  res.status(404).json({ 'Error:': message });
};
const checkUser = async (message, res) => {
  res.status(404).json({ 'Error:': message });
};

export { userDoesNotExist, checkUser };
