import bcrypt from 'bcrypt';
import * as validations from '../validations';
import  * as userService from '../services/userServices';
import * as ApplicationError from '../utils/errors/AppError';
import * as alreadyExists from '../utils/errors/alreadyExistError';
import * as tokenGenerator from '../utils/helpers/generateToken';
import db from '../database/models/index.js';
const User = db['users ']
    
const registerNew = async ( requestBody, response ,next)=> {
    try {
        const validate = validations.userSchema.signupAuthSchema.validate(requestBody);
        if (!validate.error) {
            const findIfExist = await userService.findByEmail(requestBody.email);
            if (findIfExist){
                alreadyExists.emailAlreadyExists('Email Is Already Registered',response);
            }else{
                const userData = {
                    firstName:requestBody.firstName,
                    lastName:requestBody.lastName,
                    username:requestBody.username,
                    email:requestBody.email,
                    password:requestBody.password,
                };

                const user = await userService.addUser(userData);
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
                await user.save();
                const token=await tokenGenerator.generateAccessToken({ email: user.email, id: user.id });
                if (token){
                    response.status(201).json({'accessToken': token, Message: 'User created'});
                }
                else {
                    ApplicationError.internalServerError(`An error occured failed`,response);
                }
            }
       } else {
           ApplicationError.validationError(validate.error.details[0].context.label,response);
       }
    } catch (error) {
        console.log(error)
        ApplicationError.internalServerError(`${error}`,response);
        next(error);    
    }
}
 export default {registerNew}


 
 