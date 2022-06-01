import bcrypt from 'bcrypt';
import * as validations from '../validations';
import * as userService from '../services/userServices';
import * as AppError from '../utils/errors/applicationsErrors';
import * as alreadyExists from '../utils/errors/helpers/alreadyExistError';
import * as tokenGenerator from '../utils/helpers/generateToken';

const registerNew = async (requestBody, response, next) => {
    try{
        const validate = validations.userShema.registerSchema.validate(requestBody);
        if(!validate.error){
            const findIfExist = await userService.findByEmail(requestBody.email);
            if(!findIfExist){
                alreadyExists.emailAlreadyExists('Email Already used while registering', response)
            }
            else{
                const userData = {
                    firstName:requestBody.firstName,
                    lastName:requestBody.lastName,
                    email:requestBody.email,
                    password:requestBody.password
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
                    AppError.internalServerError(`An error occured failed`,response);
                }
            }    
        }
        else {
            AppError.validationError(validate.error.details[0].context.label,response);
        }
    }
    catch (error) {
        AppError.internalServerError(`${error}`,response);
        next(error);    
    }
}

export default {registerNew}

