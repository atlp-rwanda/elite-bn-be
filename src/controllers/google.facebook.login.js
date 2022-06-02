/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */

import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import models from '../models/index';
import UserService from '../services/user';
import { jwtToken } from '../utils/jwt';
import helper from '../utils/helper';

const { Users } = models;
const fetch = require('node-fetch');

const { getUserByIdOrEmail } = UserService;
const { hashPassword } = helper;

dotenv.config();
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(googleClientID);

class SocialLogin {
  static async googleLogin(req, res) {
    try {
      const { tokenId } = req.body;
      const response = await client.verifyIdToken({ idToken: tokenId, audience: googleClientID });
      const {
        email_verified, name, email, picture
      } = response.payload;
      if (email_verified) {
        const user = await getUserByIdOrEmail(email);
        if (user) {
          const token = await jwtToken.generateToken(user);
          const { id, name, email } = user;
          return res.json({
            success: true,
            message: 'Successfully logged in with Google! ',
            token,
            user: {
              id, name, email, picture
            },
          });
        }

        const password = hashPassword(email);
        const newUser = await Users.create({
          fullname: name,
          email,
          password,
          profilePicture: picture,
          createdAt: new Date(),
          updatedAt: new Date(),

        });
        if (newUser) {
          const token = jwtToken.generateToken(newUser);
          return res.status(200)
            .json({
              success: true,
              message: 'Successfully signed up with Google',
              token
            });
        }
        return res.status(400)
          .json({
            success: false,
            message: 'Failed to create user'
          });
      }
    } catch (error) {

    }
  }

  static async facebookLogin(req, res) {
    let user;
    const { userID, accessToken } = req.body;
    const urlGraphFacebook = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
    fetch(urlGraphFacebook, { method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        const { email, name } = response;
        getUserByIdOrEmail(email).then((user) => {
          if (user) {
            const token = jwtToken.generateToken(user);
            const {
              id, fullname, email, profilePicture, roleId
            } = user;
            return res.json({
              success: true,
              message: 'Successfully logged in with Facebook! ',
              token,
              user: {
                id, fullname, email, profilePicture, roleId,
              },
            });
          }

          Users.create({
            fullname: name,
            email,
            password: accessToken,
            createdAt: new Date(),
            updatedAt: new Date(),

          }).then((newSecondUser) => {
            if (newSecondUser) {
              const {
                id, fullname, email, profilePicture, roleId
              } = newSecondUser;
              const token = jwtToken.generateToken(newSecondUser);
              return res.status(200)
                .json({
                  success: true,
                  message: 'Successfully signed up with Facebook! ',
                  token,
                  newSecondUser: {
                    id, fullname, email, profilePicture, roleId
                  }
                });
            }
            return res.status(400)
              .json({
                success: false,
                message: 'Failed to create a user'
              });
          });
        });
      });
  }
}

export default SocialLogin;
