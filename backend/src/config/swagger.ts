import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School Portal API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'],
});