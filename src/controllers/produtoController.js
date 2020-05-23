const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const produtos = await Produto.find();
        return res.send({ produtos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const produto = await Produto.findById(id);
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

module.exports = app => app.use('/produto', router);