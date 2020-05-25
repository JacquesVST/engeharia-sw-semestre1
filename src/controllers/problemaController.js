const express = require('express');
const Problema = require('../models/Problema');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const problema = await Problema.create(req.body);
        
        return res.send({ problema });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const problemas = await Problema.find();
        return res.send({ problemas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const problema = await Problema.findById(id);
        return res.send({ problema });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { descricao, preocedimentos, observacao} = req.body;

    try {
        const problema = await Problema.findByIdAndUpdate(
            id,
            {
                descricao: descricao,
                procedimentos: procedimentos,
                observacao: observacao
            },
            { new: true }
        );
        return res.send({ problema });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const aparelho = await Aparelho.findByIdAndDelete(id)
        return res.send({ aparelho });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/problema', router);