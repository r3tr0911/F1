const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Team', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })
}
