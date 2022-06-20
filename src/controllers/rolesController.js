/* eslint-disable */
import models from '../database/models';
import applicationErr from '../utils/errors/applicationError';

const { Users } = models;


export const allUser = async (req, res, next) => {
   try{
      const alluser = await Users.findAll({ attributes: {exclude: ['password']} });
       res.status(200).json({
          message: "All registed user accounts",
          alluser
       });
   }catch(err){
       console.log(err) 
       return next(new applicationErr("Fail to get users", 500));
   }
}

const updateRoles = (userRoles, userInfo) => Users.update(userInfo, {
  where: userRoles, returning: true
});

export const rolesController = async(req, res, next) => {
    try {
      const { userEmail, userRole } = req.body;
      const userToAssign = await Users.findOne({ 
        where: { email: userEmail } 
      });
      if (userToAssign && userToAssign.role !== 'super admin') {
        return await updateRoles({ email: userEmail }, { role: userRole })
          .then((data) => {
            if (data[0] > 0) {
              return res.status(201)
              .send({ message: 'User role successfully updated!', data});
            }
          })
          .catch((error) => res.status(404).send({ error }));
      } 
      return res.status(404).send({ message: "This user's email doesn't exist" });
    } catch (error) {
      return res.status(500).send({ error });
    }
}

