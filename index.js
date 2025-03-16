import "dotenv/config";
import express from 'express';
import apiRoutes from './src/router/api.routes.js';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc'
import db from './src/config/db.config.js'

const app = express();
const initDB = async () => {
  await db.sync({ alter: true });
};

// Configurar CORS
app.use(
  cors({
    origin: process.env.ORIGIN || 'http://localhost:4000',
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  })
);

// Documentación Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
  },
  apis: ['./src/router/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', serve, setup(swaggerDocs));

// Rutas de la API
app.use('/api', apiRoutes);
app.options('*', cors());

// Inicialización de la base de datos y servidor
initDB().then(() => {
  app.listen( process.env.PORT || 3000, () => console.log('Güebos'));
});
