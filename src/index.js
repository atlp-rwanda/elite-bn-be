import express from 'express'
import * as babel from '@babel/core'
import swaggerDocs from '../public/api-docs/swagger.js'
import 'dotenv/config'
const app = express()
import passport from 'passport'
import dotenv from "dotenv";
dotenv.config(".env");

const port = process.env.PORT || 3000

swaggerDocs(app, port)

app.listen(port, () => console.log(`Listening on ${port}`))
