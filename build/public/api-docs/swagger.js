"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad API',
      version: '1.0.0',
      description: 'Barefoot Nomad REST API For Barefoot Nomad App\n This API Will Manage:\n 1. CRUD Operations\n 2. User Authentication & Authorisation'
    },
    paths: {},
    security: [{
      bearerAuth: []
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'bearerAuth',
          in: 'header'
        }
      }
    }
  },
  apis: ['./**/*.yaml']
};
const swaggerSpec = (0, _swaggerJsdoc.default)(options);

const swaggerDocs = app => {
  app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

var _default = swaggerDocs;
exports.default = _default;