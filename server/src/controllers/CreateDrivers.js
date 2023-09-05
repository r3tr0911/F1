const express = require('express');
const createDrivers = express.Router();
// traemos los modelos
const { Driver, Teams } = require('../db')

// createDrivers.use(express.json());

createDrivers.post('/drivers', async(req, res) => {

    try {
        //traemos todos  los datos necesarios del query para crear un driver
        const {Nombre, Apellido, Descripción, Imagen, Nacionalidad, Fecha_de_Nacimiento, teams } = req.body;
        // preguntamos si los espacios estan vacios
        if (!Nombre || !Apellido || !Descripción || !Imagen  || !Nacionalidad  || !Fecha_de_Nacimiento  || !teams ) {
            // si es así entonves requerimos de esos datos 
            return res.status(400).json({ message: 'Faltan datos requeridos.' });
          }
          // Creamos el conductor en la base de datos
        const newDriver = await Driver.create({
            Nombre,
            Apellido,
            Descripción,
            Imagen, 
            Nacionalidad, 
            Fecha_de_Nacimiento,
            teams 
        })
        // Relacionar el conductor con los equipos
        const teamsToAdd = await Teams.findAll({
            where: {
                name: Teams, // Buscar equipos cuyos nombres estén en el array 'teams'
              },
        }) 
       // utilizamos el método newDriver.addTeams() para relacionar el conductor recién creado con los equipos que encontramos en la base de datos.
        await newDriver.addTeams(teamsToAdd);

    } catch (error) {
        return res.status(500).json({ message: 'Error al crear el conductor', error: error.message });
    }
})

module.exports = { createDrivers }