import express from 'express'
import passport from 'passport'
//import * as babel from '@babel/core';
let app=express()
require('dotenv').config()


const port = process.env.PORT || 3000;


app.listen(port, () => console.log(`Listening on ${port}`));
