const express = require('express');
const Cliente = require('../models/Cliente');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    const { cpf } = req.body;
    try {
        if (await Cliente.findOne({ cpf })) {
            return res.status(400).send({ error: 'CPF já utilizado' });
        }

        const cliente = await Cliente.create(req.body);

        cliente.senha = undefined;
        return res.send({ cliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;

    const cliente = await Cliente.findOne({ cpf }).select('+senha');
    if (!cliente)
        return res.status(400).send({ error: 'Cliente não cadastrado' });

    if (!await bcrypt.compare(senha, cliente.senha))
        return res.status(400).send({ error: 'Senha inválida' });

    cliente.senha = undefined;

    const token = jwt.sign({ id: cliente.id }, authConfig.secret, {
        expiresIn: 86400,
    });

    res.send({ cliente, token });
});

router.get('/listar', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        return res.send({ clientes });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/filtrar', async (req, res) => {
    try {
        const clientes = await Cliente.find(req.body.filtro).sort(req.body.ordem);
        return res.send({ clientes });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Filtrar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const cliente = await Cliente.findById(id);
        return res.send({ cliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, cpf, email, senha, dataNascimento, telefone, observacao } = req.body;

    try {
        const cliente = await Cliente.findByIdAndUpdate(
            id,
            {
                nome: nome,
                cpf: cpf,
                email: email,
                senha: senha,
                dataNascimento: dataNascimento,
                telefone: telefone,
                observacao: observacao
            },
            { new: true }
        );
        return res.send({ cliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const cliente = await Cliente.findByIdAndDelete(id)
        return res.send({ cliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/cliente', router);