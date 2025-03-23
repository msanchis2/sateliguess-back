import DataTypes from 'sequelize'
import db from '../config/db.config.js'

const Catalunya = db.define('Catalunya', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    provincia: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    municipio: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    comarca: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    latitud: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false
    },
    longitud: {
        type: DataTypes.DECIMAL(9,6),
        allowNull: false
    }
}, {
    tableName: 'catalunya',
    timestamps: false
});
export default Catalunya;