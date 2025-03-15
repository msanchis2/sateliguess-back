import express from 'express';
import Municipio from'../model/municipios.model.js'
import { Sequelize, Op } from "sequelize";
const router = express.Router();

// Obtener listado de municipios por búsqueda contextual
router.get('/municipios/:busqueda', async (req, res) => {
    try {
        const busqueda = req.params.busqueda.normalize("NFD").replace(/[̀-ͯ']/g, "");
        const municipios = await Municipio.findAll({
            where: Sequelize.where(
                Sequelize.fn("LOWER", Sequelize.col("municipio")),
                {
                    [Op.like]: Sequelize.fn("LOWER", `%${busqueda}%`)
                }
            )
        });        
        res.json(municipios);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al buscar municipios' });
    }
});

// Obtener datos de un municipio por ID
router.get('/municipio/:id', async (req, res) => {
    try {
        const municipio = await Municipio.findByPk(req.params.id);
        if (!municipio) {
            return res.status(404).json({ error: 'Municipio no encontrado' });
        }
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el municipio' });
    }
});

// Obtener un municipio aleatorio basado en el día actual
router.get('/municipio-diario', async (req, res) => {
    try {
        const count = await Municipio.count();
        const dayOfYear = new Date().getDate() + (new Date().getMonth() * 30);
        const randomIndex = dayOfYear % count;
        const municipio = await Municipio.findOne({ offset: randomIndex });
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el municipio diario' });
    }
});

router.get('/municipio-aleatorio', async (req, res) => {
    try {
        const count = await Municipio.count();
        const randomIndex = Math.floor(Math.random() * count); // Genera un índice aleatorio
        const municipio = await Municipio.findOne({ offset: randomIndex });
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener un municipio aleatorio' });
    }
});

export default router;