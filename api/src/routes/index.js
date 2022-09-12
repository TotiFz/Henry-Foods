const { Router } = require('express');
const dietControllers = require('../controllers/dietControllers')
const recipeControllers = require('../controllers/recipeControllers')
const createControllers = require('../controllers/createControllers')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/diet', dietControllers)
router.use('/recipe', recipeControllers)
router.use('/create', createControllers)


module.exports = router;
