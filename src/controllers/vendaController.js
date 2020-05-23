const express = require('express');
const Venda = require('../models/Venda');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const venda = await Venda.create(req.body);
        
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const vendas = await Venda.find();
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const venda = await Venda.findById(id);
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

module.exports = app => app.use('/venda', router);