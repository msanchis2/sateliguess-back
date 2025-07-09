import Municipio from '../model/municipios.model.js';
import Catalunya from '../model/catalunya.model.js';
import Illes from '../model/illes.model.js';
import { Sequelize, Op } from 'sequelize';

const getModel = (p) => {
    const paisos = {"pv": Municipio, "ca": Catalunya, "ib": Illes};
    return paisos[p];
};

export const buscarMunicipios = async (req, res) => {
    try {
        const { p } = req.query; 
        const model = getModel(p); 
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

export const obtenerMunicipioPorId = async (req, res) => {
    try {
        const { p } = req.query; 
        const model = getModel(p); 
        const municipio = await model.findByPk(req.params.id);
        if (!municipio) {
            return res.status(404).json({ error: 'Municipio no encontrado' });
        }
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el municipio' });
    }
};

export const obtenerMunicipioDiario = async (req, res) => {
    try {
        const { p } = req.query; 
        const model = getModel(p); 
        const count = await model.count();
        const dayOfYear = new Date().getDate() + (new Date().getMonth() * 30);
        const randomIndex = dayOfYear % count;
        const municipio = await model.findOne({ offset: randomIndex });
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el municipio diario' });
    }
};

export const obtenerMunicipioAleatorio = async (req, res) => {
    try {
        const { p } = req.query; 
        const model = getModel(p); 
        const count = await model.count();
        const randomIndex = Math.floor(Math.random() * count); 
        const municipio = await model.findOne({ offset: randomIndex });
        res.json(municipio);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener un municipio aleatorio' });
    }
};