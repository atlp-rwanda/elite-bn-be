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
  setToken(`token-${user.email}`, token);
  
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    message: 'User logged in successfully',
    token,
  });
};
