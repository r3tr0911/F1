const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Driver', {
    ID:{
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Descripción: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nacionalidad: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Fecha_de_Nacimiento: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
  });
};