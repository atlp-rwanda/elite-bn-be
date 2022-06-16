import swaggerDocs from '../public/api-docs/swagger.js';
import { sequelize } from "./database/models"
import dotenv from 'dotenv'
import app from './app'
import path from "path";
import passport from "passport";


require("./config/passport").default(passport);

dotenv.config();

const __dirname = path.resolve();

const port = process.env.PORT || 3000;
 swaggerDocs(app, port);
 app.emit('appStarted \n');

    sequelize
      .authenticate()
      .then(() => {
        console.log('Barefoot Nomad Database Connected!');
      }).catch((err) => {
        console.log('Barefoot Nomad Database Not Connected !!');
        console.log({ Error_Message: err });
      });
    
app.listen(port, () => console.log(`Barefoot Nomad Server Started & Listening on PORT: ${port}`));
 
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});


 app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
}); 


