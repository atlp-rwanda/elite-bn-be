/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const jwtToken = {
  generateToken({ id, email, roleId }) {
    return jwt.sign({ id, email, roleId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d',
    });
  },
  verifyToken(token) {
    let decoded;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      decoded = user;
    });
    return decoded;
  },
};
