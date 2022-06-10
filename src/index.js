
import express from 'express'
import babel from "@babel/core";
import swaggerDocs from '../public/api-docs/swagger.js';
import { sequelize } from "./database/models"
import dotenv from 'dotenv'
import app from './app'

dotenv.config()

 const port =  3000;
 swaggerDocs(app, port);
 app.emit('appStarted \n');

    sequelize
      .authenticate()
      .then(() => {
        console.log('\nBarefoot Nomad Database Connected! \n');
      }).catch((err) => {
        console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n');
        console.log({ Error_Message: err });
      });
     
     
    
 app.listen(port, () => console.log(`\nBarefoot Nomad Server Started & Listening on PORT: ${port}\n`));
 

