import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Barefoot Nomad API',
      version: '1.0.0',
      description: 'Barefoot Nomad REST API For Barefoot Nomad App\n This API Will Manage:\n 1. CRUD Operations\n 2. User Authentication & Authorisation'
    },

    paths: {},
    security: [
      {
        bearerAuth: [],
      },
    ],
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
    },
  },
  apis: ['./**/*.yaml']
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
 
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

};

export default swaggerDocs;