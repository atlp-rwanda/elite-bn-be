import model from './../database/models';
import jwt  from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

console.log("usermodel",model.User)

const User =  model.User

const generateResetToken= (uuid)=>{
   return jwt.sign({uuid},process.env.JWT_RESET_TOKEN_SECRETE,{
       expiresIn:process.env.JWT_RESET_TOKEN_EXPIRES_IN
   })
}

export const forgotPassword =  async(req,res)=>{
    try {

        /**
         * Get user eamil first
         */

        const  {email} = req.body

        console.log(email)
        
        /**
         * Check if user exist
         */

        const user  = await User.findOne({where:{email}})
        
        if(!user){
        return res.status(404).json({
            status:"fail",
            message:"No user found with that Email address"
        })
        }
        
        /**
         * Generate reset token
         */
    

      const resetToken = generateResetToken(user.uuid)
      
      /**
       * Save  reset password tken to the user document
       */

        await User.update({
            passwordResetToken:resetToken
        },{where:{email}})

      /**
       *  Send token too user email
       */
    

      res.status(200).json({
          status:"success",
          message:"Ëmail sent to user",
          resetToken
      })

    } catch (error) {
        res.status(500).json({
            status:"ërror",
            message:"Ërror while  sending reset token",
            Error:error.stack
           
        })
        console.error(error)
    }
}