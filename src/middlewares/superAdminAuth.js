const verifySuperAdmin = (req, res, next) => {
  const user = req.user;
  if (user.role !== 'super admin') {
    return res.status(401).send({ error: 'You are not super admin' });
  }

  next();
};

export default verifySuperAdmin;
