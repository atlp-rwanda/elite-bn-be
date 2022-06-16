import { async } from "regenerator-runtime";
import UserServices from "../services/userService";
import helpers from "../utils/helpers";
import responses from "../utils/responses";
import statusCode from "../utils/statusCode";
import customMessage from "../utils/customMessage";


const { getUserByIdOrEmail, getUserByIdOrUsername } = UserServices;
const { errorResponse } = responses;
const { conflict } = statusCode;
const { duplicateEmail, duplicateUsername } = customMessage;
const { comparePassword } = helpers;

const checkEmailExist = async (req, res, next) => {
  const user = await getUserByIdOrEmail(req.body.email);

  if (user) {
    return errorResponse(res, conflict, res.__("Account Exist"));
  }
  return next();
};

const checkUsernameExist = async (req, res, next) => {
  const user = await getUserByIdOrUsername(req.body.username);
  if (user) {
    return errorResponse(res, conflict, duplicateUsername);
  }
  return next();
};
export default { checkEmailExist, checkUsernameExist };

