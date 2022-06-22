
import  * as userService from '../services/userServices';
import applicationErr from '../utils/errors/applicationError';



//getting all messages 

export const getAllMessages= async (req,res) =>{

    try{
        const messages=await userService.getAllChats('barefoot namad');
        
        const {error}=messages;
        if (error){
            return next(new applicationErr('messages could not be found', 404));
                
            }

        else{
            return res.status(200).json({
                success:true,
                results:messages
            })
        }

    }
    catch(error){
        applicationErr.internalServerError(`${error}`, res);
    next(error);
    }
}

//to send a message

export const createMessage= async(req,res,next) =>{
    try{
        
       const message= await userService.addMessage({
        userId:req.user.id,
        message:req.body.message
       });
            return res.status(200).json({
                success:true,
                results:message
               })
       
    }
    catch(error){
        applicationErr.internalServerError(`${error}`, res);
        next(error);
    }
}
