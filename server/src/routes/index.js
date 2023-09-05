const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { searchDriver } = require ('../controllers/SearchDrivers');
const { searchDriversId } = require ('../controllers/SearchDriversId');
const { searchDriversName } = require ('../controllers/SearchDriversName');
const { createDrivers } = require ('../controllers/CreateDrivers')
const { searchDriverTeams } = require ('../controllers/SearchDriversTeam');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/drivers', searchDriver)
router.get('/drivers/:idDriver', searchDriversId)
router.get('/drivers/name', searchDriversName)
router.post('/drivers', createDrivers )
router.get('/teams', searchDriverTeams)



module.exports = router;
