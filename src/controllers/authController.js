import AuthServices from "../services/authService";
import { jwtToken } from "../utils/utilJWT";

/**
 * @class AuthControllers
 * @classdesc This controller deals with social media auth
 */
export default class AuthControllers {
  /**
   * @description this function is invoked upon successfull oauth login
   * @param {object} req request
   * @param {object} res response
   * @return {object} returns an object containing a success message and token
   */
  static async loginCallback(req, res) {
    try {
      AuthServices.getOrCreateUser(req.user)
        .then((userData) => {
          const {
            password,
            createdAt,
            updatedAt,
            ...user
          } = userData[0].dataValues;
          const token = jwtToken.generateToken(user);

          return res.status(200).json({
            message: res.__("User logged in successfully"),
            token,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
          });
        });
    } catch (error) {
      throw error;
    }
  }
}

