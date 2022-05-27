"use strict";

var _express = _interopRequireDefault(require("express"));

var _core = _interopRequireDefault(require("@babel/core"));

var _swagger = _interopRequireDefault(require("./public/api-docs/swagger.js"));

var _index = _interopRequireDefault(require("./database/models/index.js"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
_dotenv.default.config();

(0, _swagger.default)(app, port);

_index.default.sequelize.authenticate().then(() => {
  console.log("connected to the db");
}).catch(err => {
  console.log("Error connecting to the db", err);
});

app.listen(port, () => console.log(`Listening on ${port}`));