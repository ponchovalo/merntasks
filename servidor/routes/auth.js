// rutas para autenticacion
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controller/authController');

// Iniciar Sesion
// api/auth
router.post('/', 
    [
        check('email', 'Agrega un Email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    authController.autenticarUsuario
)

// Obtine el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado

)

module.exports = router;