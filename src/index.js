
import express from 'express'
import babel from "@babel/core";
import http from 'http';
import io from './utils/chat/websocket.io'
import swaggerDocs from '../public/api-docs/swagger.js';
import { sequelize } from './database/models';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';
require('./utils/helpers/initRedis');

const port = process.env.PORT || 3000;
const server= http.createServer(app)
io.attach(server)

 swaggerDocs(app, port);
 server.emit('appStarted \n');

    sequelize
      .authenticate()
      .then(() => {
        console.log('Barefoot Nomad Database Connected!');
      }).catch((err) => {
        console.log('Barefoot Nomad Database Not Connected');
        console.log({ Error_Message: err });
      });
     
     
    
 server.listen(port, () => console.log(`Barefoot Nomad Server Started & Listening on PORT: ${port}`));
 

