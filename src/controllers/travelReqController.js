import model from '../database/models'

const User = model 

export const getMe = (req, res,next)=>{
    res.send('this is the travel req controller');
}
