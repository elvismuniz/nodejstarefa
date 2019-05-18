const express = require('express');
const router = express.Router();
const {authenticationMiddleware} = require('../utils/token')

const controller = require('../controllers/usuarios');


router.post('/login',controller.login,)

router.post('/',authenticationMiddleware,controller.cadastro,);

router.put('/:usuarioId',authenticationMiddleware,controller.edicao,);

router.get('/:usuarioId',authenticationMiddleware,controller.buscaPorId,);

module.exports = router;