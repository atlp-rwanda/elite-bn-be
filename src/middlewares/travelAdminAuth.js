const verifyTravelAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role !== 'travel admin') {
    return res.status(401).send({ error: 'You are not travel admin' });
  }

  next();
};

export default verifyTravelAdmin;
