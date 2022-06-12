import { verifyingToken } from "../utils/helpers/roleJwtToken";


const authMiddleware = {
    verifyAdmin: (req, res, next) => {
        try {
            const token = req.headers.token;
            if(!token){
                return res.status(400).send({ error: 'no token' });
            }
            const userToken = verifyingToken(token);
            if(userToken.role !== 'super_admin'){
                return res.status(403).send({message: 'user not a super admin'});
            }next();
        }catch(error){
            return res.status(401).send({error: 'invalid token'});
        }
    }
};

export default authMiddleware;