// routes/municipios.routes.js
import express from 'express';
import {
    buscarMunicipios,
    obtenerMunicipioPorId,
    obtenerMunicipioDiario,
    obtenerMunicipioAleatorio,
} from '../controller/municipios.controller.js';

const router = express.Router();

// Obtener listado de municipios por búsqueda contextual
router.get('/municipios/:busqueda', buscarMunicipios);

// Obtener datos de un municipio por ID
router.get('/municipio/:id', obtenerMunicipioPorId);

// Obtener un municipio aleatorio basado en el día actual
router.get('/municipio-diario', obtenerMunicipioDiario);

// Obtener un municipio aleatorio
router.get('/municipio-aleatorio', obtenerMunicipioAleatorio);

export default router;