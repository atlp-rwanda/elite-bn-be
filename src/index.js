import 'dotenv/config';
import express from 'express';
import { sequelize } from './database/models';
import swaggerDocs from '../public/api-docs/swagger';
// import app from './app';


const app=express()

const port = process.env.PORT || 3000;

swaggerDocs(app, port);



app.listen(port, () => console.log(`Listening on ${port}`));
sequelize
.authenticate()
.then(() => {
  console.log('\nBarefoot Nomad Database Connected! \n');
}).catch((err) => {
  console.log('\n!!! Barefoot Nomad Database Not Connected !!! \n');
  console.log({ Error_Message: err });
});