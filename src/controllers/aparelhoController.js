const express = require('express');
const Aparelho = require('../models/Aparelho');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    const { modelo } = req.body;
    try {
        if (await Aparelho.findOne({ modelo })) {
            return res.status(400).send({ error: 'Modelo já cadastrado' });
        }

        const aparelho = await Aparelho.create(req.body);
        
        return res.send({ aparelho });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const aparelhos = await Aparelho.find();
        return res.send({ aparelhos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const aparelho = await Aparelho.findById(id);
        return res.send({ aparelho });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});


module.exports = app => app.use('/aparelho', router);