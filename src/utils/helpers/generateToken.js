import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const jwtToken = process.env.JWT_KEY;

const generateAccessToken=async (paramsObject) =>{ 
    const token=jwt.sign(paramsObject, jwtToken, { expiresIn: '1h' });
    return token;
}

const decodeAccessToken = async (token) => {
    try {
      const decodedToken = await jwt.verify(token, jwtToken);
      return decodedToken;
    } catch (error) {
      return null;
    }
  };

export {
    generateAccessToken,
    decodeAccessToken
}

