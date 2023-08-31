const express = require ('express');
const axios = require('axios');
const searchDriversId = express.Router();
const { Driver, Team } = require('../db')

searchDriversId.get('/drivers/:idDriver', async(req, res) => {
    const { idDriver } = req.params

    try{
        const response = await axios.get(`http://localhost:5000/:${idDriver}`)
        const { data } = response 

        const driversFromDb = await Driver.findOne({
            where: { id: idDriver },
            include: Team
        });

        if(driversFromDb){
            return res.status(200).json(driversFromDb)
        } else {
            const {id, name, image, teams} = data
            const driverDetail = {
                id,
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
