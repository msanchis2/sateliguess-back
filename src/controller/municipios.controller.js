// controllers/municipios.controller.js
import Municipio from '../model/municipios.model.js';
import Catalunya from '../model/catalunya.model.js'; // Importa el modelo de Catalunya
import { Sequelize, Op } from 'sequelize';

// Función para obtener el modelo correcto según el parámetro p
const getModel = (p) => {
    return p === 'pv' ? Municipio : Catalunya;
};

// Obtener listado de municipios por búsqueda contextual
export const buscarMunicipios = async (req, res) => {
    try {
        const { p } = req.query; // Obtener el parámetro p
        const model = getModel(p); // Obtener el modelo correcto
        const busqueda = req.params.busqueda.normalize("NFD").replace(/[̀-ͯ']/g, "");
        const municipios = await model.findAll({
            where: Sequelize.where(
                Sequelize.fn("LOWER", Sequelize.col("municipio")),
                {
                    [Op.like]: Sequelize.fn("LOWER", `%${busqueda}%`)
                }
            )
        });
        res.json(municipios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al buscar municipios' });
    }
};

// Obtener datos de un municipio por ID
export const obtenerMunicipioPorId = async (req, res) => {
    try {
        const { p } = req.query; // Obtener el parámetro p
        const model = getModel(p); // Obtener el modelo correcto
        const municipio = await model.findByPk(req.params.id);
        if (!municipio) {
            return res.status(404).json({ error: 'Municipio no encontrado' });
        }
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el municipio' });
    }
};

// Obtener un municipio aleatorio basado en el día actual
export const obtenerMunicipioDiario = async (req, res) => {
    try {
        const { p } = req.query; // Obtener el parámetro p
        const model = getModel(p); // Obtener el modelo correcto
        const count = await model.count();
        const dayOfYear = new Date().getDate() + (new Date().getMonth() * 30);
        const randomIndex = dayOfYear % count;
        const municipio = await model.findOne({ offset: randomIndex });
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el municipio diario' });
    }
};

// Obtener un municipio aleatorio
export const obtenerMunicipioAleatorio = async (req, res) => {
    try {
        const { p } = req.query; // Obtener el parámetro p
        const model = getModel(p); // Obtener el modelo correcto
        const count = await model.count();
        const randomIndex = Math.floor(Math.random() * count); // Genera un índice aleatorio
        const municipio = await model.findOne({ offset: randomIndex });
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener un municipio aleatorio' });
    }
};