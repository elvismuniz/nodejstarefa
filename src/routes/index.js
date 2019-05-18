const express = require('express');
const router = express.Router();

const usuarios = require('./usuarios');
const tarefas = require('./tarefas');

router.use('/usuarios', usuarios);
router.use('/tarefas', tarefas);

module.exports = router;