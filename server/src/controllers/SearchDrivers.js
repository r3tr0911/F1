const express = require('express')
const axios = require('axios')
const searchDriver = express.Router();

searchDriver.get("/drivers", async(req, res) => {
    try{
        const response = await axios.get(`http://localhost:5000/drivers`)
        const drivers = response.data
        res.josn(drivers)
    } catch (error) {
        res.status(500).json({ message : "Error al traer a los perros", error: error.message})
    }
});

module.exports = { searchDriver }