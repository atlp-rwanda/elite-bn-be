/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-await */
/* eslint-disable require-jsdoc */
/* eslint-disable linebreak-style */

import models from '../models/index';
import 'regenerator-runtime/runtime';

const { Users } = models;
/**
 * @description This service deals with the User model
 */
export default class UserServices {
  /**
   * @description this service create a new user in the db
   * @param {object} user
   * @return {object} return the created user
   */
  static async createUser(user) {
    const User = await Users.create(user);
    const { password, ...result } = User.dataValues;
    return result;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} value
   * @return {object} return the created user
   */
  static async getUserByIdOrEmail(value) {
    let user;
    if (typeof value === 'string') {
      user = await Users.findOne({ where: { email: value } });
      return user;
    }
    return await Users.findOne({ where: { id: value } });
  }

  /**
   * @description this service create a new user in the db
   * @param {object} userid
   * @return {object} return the created user
   */
  static async retrieveUserById(userid) {
    const data = await Users.findOne({
      where: { id: userid },
      attributes: { exclude: 'password' },
    });
    return data;
  }

  /**
   * @description this service create a new user in the db
   * @param {object} updates
   * @param {object} id
   * @return {object} return the created user
   */
  static async upDateUserInfo(updates, id) {
    let userNameCheck, colsAffected;
    if (updates.username) {
      userNameCheck = await Users.findAll({
        where: { username: updates.username },
      });
    }

    if (
      userNameCheck == undefined
      || userNameCheck.length == 0
      || (userNameCheck.length == 1 && userNameCheck[0].id == id)
    ) {
      colsAffected = await Users.update(updates, {
        where: { id },
        attributes: { exclude: 'email' },
      });
      if (colsAffected[0] != 0) {
        return true;
      }
      return false;
    }
    return 'Username has been taken';
  }

  /**
   * @description this service find user by Email
   * @param {object} email
   * @return {object} return current user
   */
  static async findUserByEmail(email) {
    const currentUser = await Users.findOne({ where: { email } });
    return currentUser;
  }
  /**
    * @description this sercice updateUserByRole
    * @param {object} roleId
    * @param {object} email
    * @return {object} updatedUser by role
    */

  static async updateUserByRole(roleId, email) {
    const updatedUser = await Users.update({ roleId }, { where: { email } });
    if (updatedUser) return updatedUser;
  }

  static async getUserByIdOrUsername(value) {
    let user;
    if (typeof value === 'string') {
      user = await Users.findOne({ where: { username: value } });
      return user;
    }
    return await Users.findOne({ where: { id: value } });
  }

  static async getUserByEmail(value) {
    const user = await Users.findOne({ where: { email: value } });
    return user;
  }

  static async updateUser(decoded) {
    const User = await Users.update({ isVerified: true }, {
      where: { id: decoded.id },
      returning: true,
      plain: true,
    });
    return User;
  }

  static async updatePassword(hash, decoded) {
    const User = await Users.update(
      { password: hash },
      {
        where: { id: decoded.id },
        returning: true,
        plain: true,
      }
    );
    return User;
  }
}
