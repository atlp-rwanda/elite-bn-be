import jwt from 'jsonwebtoken';
import { deleteToken, setToken, getToken } from '../helpers/initRedis';
import redisClient from './initRedis';

const { sign } = jwt;

const signToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default (user, statusCode, res) => {
  const token = signToken(user.id);
  setToken("token", token);
  const cookieOptions = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message: 'User logged in successfully',
    token,
  });
};
