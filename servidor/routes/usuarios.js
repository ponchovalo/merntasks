// rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuariosController = require('../controller/usuariosController');
const { check } = require('express-validator');

// Crea un usuario
// api/usuarios
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })
    ],
    usuariosController.crearUsuario
)

module.exports = router;
