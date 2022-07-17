import dotenv from 'dotenv';
import redisClient from './initRedis';
import jwt from 'jsonwebtoken';
import { json } from 'body-parser';

dotenv.config();
const jwtToken = process.env.JWT_SECRET;
const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;

const generateAccessToken = async (paramsObject) => {
  const token = jwt.sign(paramsObject, jwtToken, { expiresIn: '1h' });
  return token;
};

const generateRefreshToken = async (paramsObject) => {
  try {
    const token = jwt.sign(paramsObject, refreshTokenKey, { expiresIn: '1d' });
    return token;
  } catch (error) {
    return null;
  }
};

const decodeAccessToken = async (accessToken) => {
  try {
    const decodedToken = await jwt.verify(accessToken, jwtToken);
    return decodedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { generateAccessToken, generateRefreshToken, decodeAccessToken };
