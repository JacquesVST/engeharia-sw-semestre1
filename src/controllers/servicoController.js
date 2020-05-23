const express = require('express');
const Servico = require('../models/Servico');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const servico = await Servico.create(req.body);
        
        return res.send({ servico });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});


router.get('/listar', async (req, res) => {
    try {
        const servicos = await Servico.find();
        return res.send({ servicos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const servico = await Servico.findById(id);
        return res.send({ servico });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

module.exports = app => app.use('/servico', router);