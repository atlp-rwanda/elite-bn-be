import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { sendEmailOnRegistration } from '../views/email/emailTemplates.js';
import * as validations from '../validations';
import * as userService from '../services/userServices';

import * as ApplicationError from '../utils/errors/AppError';
import { sendEmailOnResetPassword } from '../views/passwordResetTemplate.js';
import * as alreadyExists from '../utils/errors/alreadyExistError';
import { errorResponse } from '../utils/errors/errorResponse';
import * as tokenGenerator from '../utils/helpers/generateToken';
import db from '../database/models/index.js';
import { compare } from 'bcryptjs';
import applicationErr from '../utils/errors/applicationError';
import models from '../database/models';
import createSendToken from '../utils/helpers/createToken';
import giveMeProfile from '../utils/helpers/profileInfo';
import sendEmail from '../utils/email/userReEmail.js';
import { deleteToken, setToken, getToken } from '../utils/helpers/initRedis';



const User = db['users '];
const { Users } = models;

const registerNew = async (requestBody, response, next) => {
  try {
    const validate = validations.userSchema.signupAuthSchema.validate(requestBody);
    if (!validate.error) {
      const findIfExist = await userService.findByEmail(requestBody.email);
      if (findIfExist) {
        alreadyExists.emailAlreadyExists('Email Is Already Registered', response);
      } else {
        const userData = {
          firstName: requestBody.firstName,
          lastName: requestBody.lastName,
          username: requestBody.username,
          email: requestBody.email,
          password: requestBody.password,
          isVerified: false,
        };

        const user = await userService.addUser(userData);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = await tokenGenerator.generateAccessToken({ email: user.email, id: user.id });
        if (token) {
       
          sendEmail(
            requestBody.email,
            process.env.EMAIL_FROM,
            'Confirmation Email',
            sendEmailOnRegistration(
              requestBody.username,
              `${process.env.BASE_URL}/api/v1/user/verify/${user.id}`
            )
          );
          response.status(201).json({ accessToken: token, Message: 'User created' });
        } else {
          ApplicationError.internalServerError(`An error occured failed`, response);
        }
      }
    } else {
      ApplicationError.validationError(validate.error.details[0].context.label, response);
    }
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, response);
    next(error);
  }
};

const userVerfication = async (req, res, next) => {
  const verifiedUser = await userService.verifyUser(req.params.id);
  res.send({
    message: 'Verified Successfully',
    verifiedUser,
  });
};

export default { registerNew, userVerfication };

export const forgotPassword = async (req, res) => {
  try {
    //check if a user exist

    const user = await userService.findByEmail(req.body.email);

    if (!user) {
      return errorResponse(res, 404, 'user is not registerd');
    }

    const resetToken = await tokenGenerator.generateAccessToken({ email: user.email, id: user.id });

    await userService.updatePasswordResetToken(resetToken);

    //send token too a user email

    const resetURL = `${req.protocol}://${req.get('host')}/process.env.BASE_URL/resetpassword/${
      user.id
    }$/{user.passwordResetToken}`;

    sendEmail(
      req.body.email,
      process.env.EMAIL_FROM,
      ' reset password',
      sendEmailOnResetPassword(user.firstName, resetURL)
    );


    res.status(200).json({
      success: true,
      message: 'email have been sent to a user',
      id: user.id,
      resetToken: resetToken,
    });
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, res);
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const validate = validations.userSchema.resetAuthSchema.validate(req.body);

    if (!validate.error) {
      const token = req.params.passwordResetToken;

      await tokenGenerator.decodeAccessToken(token);

      const { password } = req.body;
      const userId = req.params.id;

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      await userService.resetPassword(token, newPassword, userId, res);
    } else {
      ApplicationError.validationError(validate.error.details[0].context.label, res);
    }
  } catch (error) {
    ApplicationError.internalServerError(`${error}`, res);
    next(error);
  }
};

export const login = async (req, res, next) => {
  if (!req.body.password || !req.body.email) {
    return next(new applicationErr('Please fill empty fields!', 400));
  }

  try {
    let currentUser = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!currentUser) {
      return next(new applicationErr('Wrong email or password!', 401));
    }

    const hashedPassword = await compare(req.body.password, currentUser.password);

    if (!hashedPassword) {
      return next(new applicationErr('Wrong email or password!', 401));
    }

    createSendToken(currentUser, 200, res);
  } catch (error) {
    return next(new applicationErr('Opps! something went wrong', 500));
  }
};

export const getProfile = async (req, res, next) => {
  const freshUser = await Users.findByPk(req.user.id);
  if (!freshUser) {
    return next(new applicationErr('user not found', 404));
  }

  if (freshUser.id != req.user.id) {
    return next(new applicationErr("This token doesn't belong to this user", 401));
  }
  const user = await Users.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] },
  });
  res.status(200).json({
    message: 'my profile',
    user,
  });
};

export const updateProfile = async (req, res, next) => {
  const freshUser = await Users.findByPk(req.user.id);
  if (!freshUser) {
    return next(new applicationErr('user not found', 404));
  }
  if (freshUser.id != req.user.id) {
    return next(new applicationErr("This token doesn't belong to this user", 401));
  }

  await Users.update(req.body, { where: { id: req.user.id } })
    .then(() => Users.findOne({ where: { id: req.user.id } }))
    .then((user) => {
      res.status(200).json({ status: 200, message: 'profile updated!', user: giveMeProfile(user) });
    })
    .catch((error) => res.status(500).json({ error: 'internal sever error', error }));
};



export const logout = async (req, res) => {

  const foundToken = await getToken(`token-${req.user.email}`);

  if (!foundToken) {
    return res.status(401).json({ message: 'token not found!!' });
  }
  await deleteToken(`token-${req.user.email}`) ;
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'User logged out successfully',
  });
}
