const express = require('express');
const router = express.Router();

const {authenticationMiddleware} = require('../utils/token');
const controller = require('../controllers/tarefas');

router.post('/',authenticationMiddleware,controller.cadastro,);

router.get('/:tarefaId',authenticationMiddleware,controller.buscaPorId,);

router.get('/',authenticationMiddleware,controller.listagem,);

router.put('/:tarefaId',authenticationMiddleware,controller.edicao,);

router.delete('/:tarefaId',authenticationMiddleware,controller.remocao,);

router.put('/:tarefaId/concluida',authenticationMiddleware,controller.marcarConcluida,);

router.delete('/:tarefaId/concluida',authenticationMiddleware,controller.desmarcarConcluida,);

module.exports = router;