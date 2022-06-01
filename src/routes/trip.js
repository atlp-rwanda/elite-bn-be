const express = require('express');
const router = express.Router();
const Trip = require('../database/models/trip');
//find one requester with the request she/he made(done by rrequester)
app.post('/trips', async(req, res) => {
    const { userTid,source, destination, accomodation,dep_date,ret_date,reason, status} = req.body

try{
    const user = await User.findOne({where: {tid: userTid }})
    const trip = await Trip.create({source, destination, accomodation,dep_date,ret_date,reason, status, userId:user.id })
    return res.json(trip)
}
catch(err){
    console.log(err)
    return res.status(500).json(err)
}
})
// find all requester trip and their requesters
app.get('/trips', async(req, res) => {
    try {
        const user = await User.findOne({where: {role: userTid }})
        const trips = await Trip.findAll({include:User });
        return res.status(200).json(trips)

    }
    catch(err){ 
        console.log(err)
        return res.status(500).json({message:'Something went wrong'})
    }
})
//delete request
app.put('/trips', async(req, res) => {
    try {
        const trips = await Trip.findAll({include:User });
        return res.status(200).json(trips)

    }
    catch(err){ 
        console.log(err)
        return res.status(500).json({message:'Something went wrong'})
    }
})
app.listen({port:3000}, async() => {
    console.log('server up on on http://localhost:3000')
await sequelize.authenticate()
    console.log('Database connected')
})
    

  
  


module.exports = router