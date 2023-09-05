const express = require('express');
const axios = require('axios');
// const { Sequelize, DataTypes } = require('sequelize');
const searchDriverTeams = express.Router();
const { Teams } = require('../db')

searchDriverTeams.get('/teams', async(req, res) => {
    try{
        const teamsCount = await Teams.count();
    // Verificar si la base de datos de equipos está vacía 
    // si esta vacia entonces...
    if ( teamsCount === 0) {
        try {
         //hacemos una petición 
        const response = await axios.get(`http://localhost:5000/drivers`)

        // guardamos los temas de la base de datos
        const teamsFromApi = response.data

        //usamos un flat map para pegruntar si driver tiene un equipo y si es así lo separamos por coma y si no 
        // devolvemos un array vacio 
        .flatMap(driver => driver.teams? driver.teams.split(","): [])

        //usamos un filter 
        // team: se considera en cada iteración - index: elemento actual del array - self: todo el array de teams
        // preguntamos si es igual al index( si ya existe o no)
        .filter((teams, index, self) => self.indexOf(teams) === index);

        // Guardar los temperamentos en la base de datos
        await Promise.all(teamsFromApi.map(async teams => {
        await Teams.findOrCreate({ where: { name : teams.trim() }});
        }));

    } catch (error) {
        return res.status(500).json({message: 'Error al obtener los equipos', error: error.message})
        }
    }
    
       
     // Obtener todos los temperamentos de la base de datos
     const allTeams = await Teams.findAll();
     return res.status(200).json(allTeams);
        

    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener equipos', error: error.message });
      }
    });

module.exports = { searchDriverTeams };