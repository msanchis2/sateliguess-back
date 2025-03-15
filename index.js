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
    origin: 'http://localhost:4000', // Sin la barra final
    methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Configurar encabezados permitidos
    credentials: true, // Si usas cookies o headers de autenticación
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
app.options('*', cors()); // Permite todas las solicitudes preflight

// Inicialización de la base de datos y servidor
initDB().then(() => {
  app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
});
