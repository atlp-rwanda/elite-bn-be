import jsonwebtoken  from 'jsonwebtoken';
import {compare}  from 'bcryptjs';


const { sign } = jsonwebtoken;

const signToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        secure: false,
        httpOnly: true,
    };
    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    });
};

export const login = async (req, res, next) => {
    if (!req.body.password || !req.body.email) {
        res.status(400).json({
            message:"'Please fill empty fields!"
        })
    }

    try{
        
        let currentUser = await User.findOne({ where: { email: req.body.email } });
        
        if (!currentUser){
            res.status(401).json({
                message:"Wrong email or password!"
            })
        }

        const hashedPassword = await compare(req.body.password, currentUser.password);
    
        if (!hashedPassword){
            res.status(401).json({
                message:"Wrong email or password!"
            })
        }
        createSendToken(currentUser, 201, res);
    }catch{
        res.status(500).json({
            MessagePort:"something went wrong"
        })
    }
   
};