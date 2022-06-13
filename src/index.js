import express from 'express';
import babel from '@babel/core';
import * as redis from 'redis';
import swaggerDocs from '../public/api-docs/swagger.js';
import { sequelize } from './database/models';
import dotenv from 'dotenv';
dotenv.config();
import app from './app';
require('./utils/helpers/initRedis');

const port = process.env.PORT || 3000;
swaggerDocs(app, port);
app.emit('appStarted \n');

sequelize
  .authenticate()
  .then(() => {
    console.log('Barefoot Nomad Database Connected!');
  })
  .catch((err) => {
    console.log('Barefoot Nomad Database Not Connected');
    console.log({ Error_Message: err });
  });

app.listen(port, () => console.log(`Barefoot Nomad Server Started & Listening on PORT: ${port}`));

export default app;
