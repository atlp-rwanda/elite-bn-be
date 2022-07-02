import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { sendEmailOnRegistration } from '../views/email/emailTemplates.js';
import * as validations from '../validations';
import * as userService from '../services/userServices';
import * as ApplicationError from '../utils/errors/AppError';
import * as alreadyExists from '../utils/errors/alreadyExistError';
import * as tokenGenerator from '../utils/helpers/generateToken';
import db from '../database/models/index.js';
import { compare } from 'bcryptjs';
import applicationErr from '../utils/errors/applicationError';
import models from '../database/models';
import createSendToken from '../utils/helpers/createToken';
import giveMeProfile from '../utils/helpers/profileInfo';
import Email from '../utils/email/userReEmail.js';
import { sendEmail } from '../utils/email';
import user from '../database/models/user.js';
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
            process.env.SENDGRID_USERNAME,
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
    console.log(error);
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
    console.log(error);
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

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'successfully logged out', data: null });
};
