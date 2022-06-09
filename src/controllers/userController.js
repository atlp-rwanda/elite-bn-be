import models from '../database/models';
import applicationErr from '../utils/errors/applicationError';
const { Users } = models;


export const getOne =  async (req, res, next) => {

    const freshUser = await Users.findByPk(req.user.id);
        if(!freshUser){
            return next( new applicationErr('user not found', 404))

        }
        if(freshUser.id!=req.params.id){
            return next( new applicationErr("This token doesn't belong to this user", 404)
            )
        }
        const user = await Users.findOne({where: {id: req.params.id}});
        res.status(200).json({ 
            message:"Selected User", 
            user
        });
};


export const updateProfile = async (req, res, next) => {

    const freshUser = await Users.findByPk(req.user.id);
    if(!freshUser){
        return next(
            new applicationErr("user not found", 404)
        )
    }
    if(freshUser.id!=req.params.id){
        return next(
            new applicationErr("This token doesn't belong to this user", 404)
        )
    }

    const updateUser = await Users.update(
               { 
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                gender: req.body.gender, 
                birthdate: req.body.birthdate,
                address: req.body.address,
                department: req.body.department,
                preferredLanguage: req.body.preferredLanguage,
                preferredCurrency: req.body.preferredCurrency,
               },
              {where: { id: req.params.id }}
       );
        return res.status(200).json({
                message:"user profile updated successfully!",
                updateUser
        });
};

