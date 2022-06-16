/* eslint-disable import/first */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
import models from "../database/models/user";

const { Users } = models;
import { OAuth2Client } from "google-auth-library";

const fetch = require('node-fetch');

import createSendToken from '../utils/helpers/createToken';
import helper from "../utils/helpers.js";

const { hashPassword } = helper;
import dotenv from "dotenv";

dotenv.config();

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(googleClientID);

class SocialLogin {
  static async googleLogin(req, res) {
    try {
      const { tokenId } = req.body;
      const response = await client.verifyIdToken({idToken: tokenId, audience: googleClientID});
      const {
        email_verified, name, email, picture
      } = response.payload;
      if (email_verified) {
        const user = await getUserByIdOrEmail(email);
        if (user) {
          const token = await createSendToken(user, 201, res);
          const {
            id, name, email, picture
          } = user;
          return res.json({
            success: true,
            message: "Successfully logged in with Google!",
            token,
            user: {
              id, name, email, picture
            },
          });
        }

        const password = hashPassword(email);
        const newUser = await Users.create({
          socialMediaID: id,
          username: name,
          email,
          password,
          image: picture,
          createdAt: new Date(),
          updatedAt: new Date(),

        });
        if (newUser) {
          const token = createSendToken(newUser, 201, res);
          return res.status(200)
            .json({
              success: true,
              message: "Successfully signed up with Google!",
              token
            });
        }
        return res.status(400)
          .json({
            success: false,
            message: "Failed to create user"
          });
      }
    } catch (error) {

    }
  }

  static async facebookLogin(req, res) {
    let user;
    const { userID, accessToken } = req.body;
    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    fetch(urlGraphFacebook, { method: "GET"})
      .then((response) => response.json())
      .then((response) => {
        const { email, name } = response;
        getUserByIdOrEmail(email).then((user) => {
          if (user) {
            const token = createSendToken(user, 201, res);
            const {
              id, username, email, profilePicture, roleId
            } = user;
            return res.json({
              success: true,
              message: "Successfull logged in with Facebook",
              token,
              user: {
                id, username, email, profilePicture, roleId,
              },
            });
          }

          Users.create({
            username: name,
            email,
            password: accessToken,
            createdAt: new Date(),
            updatedAt: new Date(),

          }).then((newSecondUser) => {
            if (newSecondUser) {
              const {
                id, username, email, image
              } = newSecondUser;
              const token = createSendToken(newSecondUser, 200, res);
              return res.status(200)
                .json({
                  success: true,
                  message: "Successfully signed up with Facebook!",
                  token,
                  newSecondUser: {
                    id, username, email, image
                  }
                });
            }
            return res.status(400)
              .json({
                success: false,
                message: "Faied to creat user!"
              });
          });
        });
      });
  }
}

export default SocialLogin;
