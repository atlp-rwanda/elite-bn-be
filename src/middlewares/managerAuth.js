const verifyManager = (req, res, next) => {
  const user = req.user;
  if (user.role !== 'manager') {
    return res.status(401).send({ error: 'You are not manager' });
  }

  next();
};

export default verifyManager;
