import jwt from 'jsonwebtoken';
import models from '../database/models';
const { Users } = models;

export const userAuth = async (req, res, next) => {
    // console.log(req.headers.jwt);
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
           
            const decoded =  jwt.verify(token, process.env.JWT_SECRET);

        const freshUser =  await Users.findByPk(decoded.id); 
        req.user = freshUser;
        next()
       
    }catch(error){
        console.log(error)
        return res.status(401).json({
            status: "fail",
            message: "login first!"
            
        });

    } 
    
};



 