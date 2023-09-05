// requerimos de express y axios
const express = require ('express');
const axios = require('axios');
const searchDriversName = express.Router();
//traemos los modelos que hicimos para usarlos en la busqueda 
const { Driver, Teams} = require ('../db')
// traemos los operadores de la libreria de sequelize para definir operadores comparativos en la busqueda, en este caso es iLike
const { Op } = require('sequelize'); 

searchDriversName.get("/drivers/name", async (req, res) =>{
    //hacemos destructuring para buscar por nombre de lo que tengamos en la query
    const { name } = req.query  

    try {
        //buscamos en la DB usando el metodo findall
        const dbDrivers  = await Driver.findAll({
            // con where especificamos que queremos buscar el name
            where: {
                name: {
                    //en este caso usamos el operador iLike para una busqueda flexible y
                    //usamos el metodo trim para buscar el nombre a pesar de los espacios 
                    [Op.iLike] : `%${name.trim()}%`
                }
            },
            // incluimos los teams y un limite de 15 conductores con los mismos parametros de busqueda 
            include: Teams,
            limit: 15
        })
        // aqui estamos haciendo una petición a la API para buscar en ella tambien y no solo en la base de datos
        const response = await axios.get(`http://localhost:5000/drivers?name.forename=${name}`); 
        const apiDrivers = response.data;
        //aqui juntamos ambas respuestas de la DB y de la API
        const combinedDrivers = [...dbDrivers, ...apiDrivers];
        // aqui preguntamos si tenemos algo que mostrarle al cliente?
        if (combinedDrivers){
            return res.status(200).json(combinedDrivers)
        } else {
            return res.status(404).json({message: "No se encontraron conductores com ese nombre."})
        }
        //manejamos errores
    } catch (error) {
        return res.status(500).json({ message: "Error al buscar conductores por nombre.", error: error.message });
    }
})

module.exports = { searchDriversName }





