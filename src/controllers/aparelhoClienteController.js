const express = require('express');
const AparelhoCliente = require('../models/AparelhoCliente');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const aparelhoCliente = await AparelhoCliente.create(req.body);
        
        return res.send({ aparelhoCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const aparelhosCliente = await AparelhoCliente.find();
        return res.send({ aparelhosCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const aparelhoCliente = await AparelhoCliente.findById(id);
        return res.send({ aparelhoCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

module.exports = app => app.use('/aparelho-cliente', router);