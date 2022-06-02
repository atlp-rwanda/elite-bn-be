/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import express from 'express';
import * as babel from '@babel/core';
import swaggerDocs from '../public/api-docs/swagger.js';
import 'dotenv/config';

const app = express();

const port = process.env.PORT || 3000;

swaggerDocs(app, port);

app.listen(port, () => console.log(`Listening on ${port}`));
