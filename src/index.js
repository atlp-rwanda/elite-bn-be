import babel from "@babel/core";
import swaggerDocs from '../public/api-docs/swagger.js';
import {sequelize} from './database/models';
import app from './app';



const port = process.env.PORT || 3000;
swaggerDocs(app, port);


sequelize
    .authenticate()
    .then(() => {
        console.log("connected to the db");
    })
    .catch((err) => {
        console.log("Error connecting to the db", err);
    });


app.get('/', (req, res) => res.send('Welcome to Elite Bn Be API'));

app.listen(port, () => console.log(`Listening on ${port}`));

