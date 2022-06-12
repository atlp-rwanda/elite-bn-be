import models from '../database/models';

const { Users } = models;

const updateUserRole = (userRoles, userInfo) => Users.update(userInfo, { 
    where: userRoles, returning: true
});

export const getMe = (req, res) =>{
    
    res.send("this is users role controller");

}

export default class rolesController {
    static async roleController(req, res) {
      try {
        const { userEmail, userRole } = req.body;
        const userFound = await users.findOne({ where: { email: userEmail } });
        if (userFound && userFound.role !== 'super_admin') {
          return await updateUserRole({ email: userEmail }, { role: userRole })
            .then((data) => {
              if (data[0] > 0) {
                return res.status(200).send({ message: 'User role successfully updated' });
              }
            })
            .catch((error) => res.status(404).send({ error }));
        } if (userFound && userFound.role === 'super_admin') {
          return res.status(403).send({ message: 'User is a super admin' });
        } return res.status(404).send({ message: 'User not found' });
      } catch (error) {
        return res.status(500).send({ error });
      }
    }
  }