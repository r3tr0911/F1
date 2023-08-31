// requrimos express y axios así que hacemos la importación 
// tambien declaramos la variable en el express.Router
const express = require('express')
const axios = require('axios')
const searchDriver = express.Router();

//en nuestra constante le hacemos el get, puesto que esto sera una función asincrona requerimos del req y el res
searchDriver.get("/drivers", async(req, res) => {
    try{
        const response = await axios.get(`http://localhost:5000/drivers`)
        //tambien al ser asincrona hacemos una peticion al local host con un get y lo vamos a esperar con un await
        const drivers = response.data
        //guardamos nuestra info de la petición en drivers
        res.josn(drivers)
        //devolvemos el obj json con la info
    } catch (error) {
        res.status(500).json({ message : "Error al traer a los corredores", error: error.message})
        //Manejamos el error
    }
});

module.exports = { searchDriver }
//exportamos la funcion 