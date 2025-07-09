import DataTypes from 'sequelize'
import db from '../config/db.config.js'

const Illes = db.define('Municipio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    municipio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    comarca: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    latitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    },
    longitud: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false
    }
}, {
    tableName: 'illes',
    timestamps: false
});
export default Illes;