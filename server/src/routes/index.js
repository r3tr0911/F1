const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { searchDriver } = require ('../controllers/SearchDrivers');
const { searchDriversId } = require ('../controllers/SearchDriversId');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/drivers', searchDriver)
router.get('/drivers/:idDriver', searchDriversId)


module.exports = router;
