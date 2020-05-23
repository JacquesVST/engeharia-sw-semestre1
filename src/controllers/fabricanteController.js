const express = require('express');
const Fabricante = require('../models/Fabricante');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const fabricante = await Fabricante.create(req.body);

        return res.send({ fabricante });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const fabricantes = await Fabricante.find();
        return res.send({ fabricantes });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const fabricante = await Fabricante.findById(id);
        return res.send({ fabricante });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar', async (req, res) => {
    const { id, nome, siteOficial, contatoPrincipal, contatoSecundario, observacao } = req.body;

    try {
        const fabricante = await Fabricante.findOneAndUpdate({ id: id }, { nome: nome, siteOficial: siteOficial, contatoSecundario: contatoPrincipal, contatoSecundario: contatoSecundario, observacao: observacao })
        return res.send({ fabricante });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.deletar('/deletar', async (req, res) => {
    const { id } = req.body;

    try {
        const fabricante = await Fabricante.findOneAndDelete({ id: id })
        return res.send({ fabricante });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

module.exports = app => app.use('/fabricante', router);