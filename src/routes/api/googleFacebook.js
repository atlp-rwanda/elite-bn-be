/* eslint-disable no-underscore-dangle */
/* eslint-disable semi */
/* eslint-disable import/newline-after-import */
/* eslint-disable quotes */

import express from "express";
import bodyparser from "body-parser";
import methodoverride from "method-override";
import cors from "cors";
import path from "path";
import passport from "passport";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import AuthControllers from "../../controllers/authController";
import SocialLogin from "../../controllers/googleFacebookLogin";
import successResponse from '../../utils/responses';


dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(cookieParser());
app.use(bodyparser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(methodoverride());
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileStoreOptions = {};

app.get("/home", (req, res, next) => res.status(200).json({
  message: "welcome",
}));

app.get(
  "/user/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  
);

app.get(
  "/user/login/google/redirect/",
  passport.authenticate("google", { scope: ['profile', 'email'] }),
  SocialLogin.googleLogin,
  AuthControllers.loginCallback,
  successResponse.successResponse
);



app.get(
  "/user/login/facebook",
  passport.authenticate("facebook", {
    scope: ["email"],
  })
);

app.get(
  "/user/login/facebook/redirect/",
  passport.authenticate("facebook", {
    failureRedirect: "/",
  }),
  SocialLogin.facebookLogin,
  AuthControllers.loginCallback
);

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  store: new FileStore(fileStoreOptions),
  resave: true,
  saveUninitialized: false,
  secret: 'keyboard cat'
}));

export default app;
