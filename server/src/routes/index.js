const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { searchDriver } = require ('../controllers/SearchDrivers');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/drivers', searchDriver)

module.exports = router;
