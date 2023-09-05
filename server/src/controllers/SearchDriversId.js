// requerimos de express y axios
const express = require ('express');
const axios = require('axios');
// delaramos la constante en express.Router
const searchDriversId = express.Router();
//traemos los modelos que creamos
const { Driver, Teams } = require('../db')
//hacemos una petición a la url con una funcion async
searchDriversId.get('/drivers/:idDriver', async(req, res) => {
    //desestructuramos el id del params 
    const { idDriver } = req.params

    try{
        //hacemos una peticion que esperaremos con "await"
        const response = await axios.get(`http://localhost:5000/:${idDriver}`)
        //guardamos los datos de la petición 
        const { data } = response 
        //hacemos la busqueda 
        const driversFromDb = await Driver.findOne({
            //where: parametro de busqueda
            where: { id: idDriver },
            //que incluya los equipos 
            include: Teams
        });
        //si hay algo en la Db lo traemos en objeto json
        if(driversFromDb){
            return res.status(200).json(driversFromDb)
        } else {
            const {id, driverRef, number, name, image, teams} = data
            const driverDetail = {
                id,
                driverRef,
                number,
                name,
                image,
                teams
            }
            return res.status(200).json(driverDetail)
        }
    } catch (error){
        return res.status(500).json({ message: "Error al traer al corredor", error: error.message });
    }
})
module.exports = { searchDriversId }
