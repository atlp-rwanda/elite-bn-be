import jwt from 'jsonwebtoken';
import models from '../database/models';
import applicationErr from '../utils/errors/applicationError';

const { Users } = models;

 const checkAuth = async (req, res, next) => {
    try{
        let token;
        if( req.headers.jwt){
            token = req.headers.jwt;            
        }
        else if (req.cookies) {
                token = req.cookies.jwt;            
            }else  if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')
                ) {
                    token = req.headers.authorization.split(' ')[1];
                }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const freshUser =  await Users.findByPk(decoded.id); 
        req.user = freshUser;
        next()
       
    }catch(error){
        return next(
            new applicationErr("Invalid token. Please login again!", 401)
        );
    } 
};

export default checkAuth;

