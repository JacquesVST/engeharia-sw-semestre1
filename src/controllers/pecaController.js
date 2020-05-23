const express = require('express');
const Peca = require('../models/Peca');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const peca = await Peca.create(req.body);
        
        return res.send({ peca });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const pecas = await Peca.find();
        return res.send({ pecas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const peca = await Peca.findById(id);
        return res.send({ peca });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

module.exports = app => app.use('/peca', router);