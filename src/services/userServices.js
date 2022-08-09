import models from '../database/models';
import * as userExist from '../utils/errors/doesNotExistError';
import { errorResponse } from '../utils/errors/errorResponse';
import { successResponse } from '../utils/responses/successResponse';
import redisClient from '../utils/helpers/initRedis';
import user from '../database/models/user';

const { Users } = models;
const addUser = async (newUser) => {
  const user = await Users.create(newUser);
  return user;
};
const addMessage = async (newMessage) => {
  const message = await models.Chat.create({ ...newMessage });

  return message;
};
const findByEmail = async (email) => {
  const user = await Users.findOne({ where: { email: `${email}` } });
  if (user) {
    delete user.dataValues.password;
  }
  return user;
};
const findById = async (id) => {
  const user = await Users.findOne({ where: { id } });
  if (user) {
    delete user.dataValues.password;
  }
  return user;
};

const getAllChats = async (chatTab) => {
  const chats = await models.Chat.findAll({
    where: { chatTab },
    include: [
      {
        model: models.Users,
        attributes: ['firstName'],
      },
    ],
  });
  return chats;
};

const updatePasswordResetToken = async (token) => {
  const passwordResetToken = await redisClient.SET('passwordResetToken', token);
  return passwordResetToken;
};

const resetPassword = async (token, newPassword, userId, res) => {
  const result = await redisClient.get('passwordResetToken');

  if (result === token) {
    const user = await Users.update(
      {
        password: newPassword,
      },
      { where: { id: `${userId}` } }
    );

    await redisClient.del('passwordResetToken');
    if (user) {
      return successResponse(res, 200, {
        success: true,
        message: 'password reset successfully',
      });
    }
  } else {
    return errorResponse(res, 401, 'unauthorized');
  }
};

const updateOrCreate = async (model, where, newItem) => {
  // First try to find the refresh token
  const foundItem = await model.findOne({ where });
  if (!foundItem) {
    // If refresh token not found, create a new one
    const item = await model.create(newItem);
    return { item, created: true };
  }
  // If Found, update it
  const item = await model.update(newItem, { where });
  return { item, created: false };
};

const verifyUser = async (id) => {
  const user = await Users.findOne({ where: { id: `${id}` } });
  try {
    const verified = Users.update(
      { isVerified: true },
      { where: { id: `${id}` } }
    
    );
   
    return verified;
  } catch (error) {
    return error.json();
  }
};
export { updateOrCreate };
export {
  addUser,
  findByEmail,
  updatePasswordResetToken,
  findById,
  resetPassword,
  verifyUser,
  addMessage,
  getAllChats,
};
