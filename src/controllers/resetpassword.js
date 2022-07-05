
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../database/models/user';
import dotenv from 'dotenv';
const resetSecret = process.env.RESET_SECRET;

const forgot= async function(req,res,next){
    const {email}=req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            res.status(404).json({
                error: "Invalid email"
            })
        }else{
            const token = jwt.sign({ user: user.email }, 
                resetSecret, { expiresIn: '10m' });
                await update(user.id, { token });
                sendEmail(user, token);
                res.status(200).json({ message: "Check your email"} );
        }

    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
};
const reset= async function(req,res,next){
    const token = req.params.token;
    if(token) {
        jwt.verify(token, resetPassword, (error, decodedToken) => {
             if(error) {
               res.status().json({ message: 'Incorrect token or expired' })
             }
        })
      }
      try{
        const user = await filterBy({ token });
        if(!user) {
            res.status(400).json({ message: 'We could not find a match for this link' });
          }
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          req.body.password=hashedPassword;
          const updatedCredentials = {
            password: req.body.password,
            token: null
          }
          await update(user.id, updatedCredentials);
          res.status(200).json({ message: 'Password updated' });


      }catch(error){
        res.status(500).json({ message: error.message });
      }

}
function filterBy(filter) {
    return db('users').where(filter);
  }
  
  function update(id, changes) {
    return db('users').where({ id }).update(changes);
  }

  export default {reset,forgot}