const express = require('express');
const Aparelho = require('../models/Aparelho');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    const { modelo } = req.body;
    try {
        if (await Aparelho.findOne({ modelo })) {
            return res.status(400).send({ error: 'Modelo já cadastrado' });
        }

        const aparelho = await (await Aparelho.create(req.body)).populate('fabricante');

        return res.send({ aparelho });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const aparelhos = await Aparelho.find().populate('fabricante');
        return res.send({ aparelhos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/filtrar', async (req, res) => {
    try {
        const aparelhos = await Aparelho.find(req.body.filtro).sort(req.body.ordem).populate('fabricante');
        return res.send({ aparelhos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Filtrar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const aparelho = await Aparelho.findById(id).populate('fabricante');
        return res.send({ aparelho });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, modelo, fabricante, fichaTecnica, siteOficial, observacao } = req.body;

    try {
        const aparelho = await Aparelho.findByIdAndUpdate(
            id,
            {
                nome: nome,
                modelo: modelo,
                fabricante: fabricante,
                fichaTecnica: fichaTecnica,
                siteOficial: siteOficial,
                observacao: observacao
            },
            { new: true }
        ).populate('fabricante');
        return res.send({ aparelho });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const aparelho = await Aparelho.findByIdAndDelete(id).populate('fabricante');
        return res.send({ aparelho });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/aparelho', router);