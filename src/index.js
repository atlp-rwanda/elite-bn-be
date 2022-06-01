import express from 'express'
import * as babel from '@babel/core'
import swaggerDocs from '../public/api-docs/swagger.js'
import userRoute from './'
import 'dotenv/config'
const app = express()
import passport from 'passport'
import dotenv from "dotenv";
dotenv.config(".env");

const port = process.env.PORT || 3000

swaggerDocs(app, port)

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to Barefoot Nomad api.' 
    });
});

// app.use('/api/v1/user', require('./routers/user.router'))


app.listen(port, () => console.log(`Listening on ${port}`))

