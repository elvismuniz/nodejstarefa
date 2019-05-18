const {Usuario} = require('../models/index')
const {generateToken} = require('../utils/token')
const bcrypt = require ('bcrypt')
const salt = bcrypt.genSaltSync(10)

function cadastro(req, res, next) {
    const usuario = req.body;

    Usuario.create({
            nome: usuario.nome,
            email: usuario.email,
            nascimento: usuario.nascimento,
            cpf: usuario.cpf,
            senha: bcrypt.hashSync(usuario.senha, salt)  ,
        })
        .then(function(usuarioCriado) {
            const usuarioJson = usuarioCriado.toJSON()
            delete usuarioJson.senha;
            res.status(201).json(usuarioJson)
        })
        .catch(function(error) {
            if (Array.isArray(error.errors)) {
                const sequelizeError = error.errors[0]
                if (sequelizeError.type === 'unique violation' &&
                    sequelizeError.path === 'email') {
                    res.status(422).send('O e-mail informado já está cadastrado.');
                    return;
                }
            }
            res.status(422).send();
        })
}

function buscaPorId(req, res, next) {
    const usuarioId = req.params.usuarioId

    Usuario.findByPk(usuarioId)
        .then(function(usuario) {
            if (usuario) {
                const usuarioJson = usuario.toJSON()
                delete usuarioJson.senha
                res.status(200).json(usuarioJson)
            } else {
                res.status(404).send()
            }
        })
        .catch(function(error) {
            console.log(error)
            res.status(422).send()
        })
}

function edicao(req, res, next) {
    const usuarioId = req.params.usuarioId
    const body = req.body

    Usuario.findByPk(usuarioId)
        .then(function(usuario) {
            if (usuario) {
                return usuario.update({
                        nome: body.nome,
                        email: body.email,
                        nascimento: body.nascimento,
                        senha: body.senha,
                        cpf: body.cpf,
                    })
                    .then(function(usuarioAtualizado) {
                        const usuarioJson = usuarioAtualizado.toJSON()
                        delete usuarioJson.senha
                        res.status(200).json(usuarioJson)
                    })
            } else {
                res.status(404).send()
            }
        })
        .catch(function(error) {
            console.log(error)
            res.status(422).send()
        })
}

function login(req, res, next) {

    const email = req.body.email;
    const senha = req.body.senha;

    const payload = [{
        id: 1,
        nome: 'douglas',
        email: email,
        senha: senha
    }]

    if (payload[0].email == 'douglas@mail.com' && payload[0].senha == 'senha123') {
        const token = generateToken(payload[0])
        res.json({
            token
        })
    } else {
        res.status(401).send('E-mail ou senha incorretos')
    }
}

module.exports = {
    cadastro,
    buscaPorId,
    edicao,
    login,
};