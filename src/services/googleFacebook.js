import { authorizedUser } from '../database/models';
import {
  generateAccessToken,
  generateRefreshToken,
  decodeRefreshToken
} from '../utils/helpers/generateToken';
import { updateOrCreate } from './userServices';

const storeToken = async (user = null, token = null) => {
  if (token) {
    const refreshTokenExist = await authorizedUser.findOne({
      where: { refreshToken: token }
    }); 
    if (!refreshTokenExist) {
      return null;
    }
    user = await decodeRefreshToken(token);
    await authorizedUser.destroy({ where: { refreshToken: token } }); 
  }

  try {
    const userData = {
      id: user.id,
      email: user.email
    };
    const accessToken = await generateAccessToken(userData);
    const refreshToken = await generateRefreshToken(userData);
    await updateOrCreate(
      authorizedUser,
      { id: userData.id },
      { id: userData.id, refreshToken }
    ); 
    return { accessToken, refreshToken };
    
  } catch (error) {
    return error.message;
  }
};

export default storeToken;
