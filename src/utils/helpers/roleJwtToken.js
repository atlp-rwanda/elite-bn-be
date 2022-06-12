import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
export const jwtToken = {
  createToken({
    id, email, firstName, lastName, role
  }) {
    return jwt.sign({
      id, email, firstName, lastName, role
    },
    process.env.JWT_KEY, { expiresIn: '24h' });
  },
};
export function verifyingToken(token) {
  const verifiedToken = jwt.verify(token, process.env.JWT_KEY);
  return verifiedToken;
}
