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

router.get('/filtrar', async (req, res) => {
    try {
        const fabricantes = await Fabricante.find(req.body.filtro).sort(req.body.ordem);
        return res.send({ fabricantes });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Filtrar' });
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

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, siteOficial, contatoPrincipal, contatoSecundario, observacao } = req.body;

    try {
        const fabricante = await Fabricante.findByIdAndUpdate(
            id,
            {
                nome: nome,
                siteOficial: siteOficial,
                contatoPrincipal: contatoPrincipal,
                contatoSecundario: contatoSecundario,
                observacao: observacao
            },
            { new: true }
        );
        return res.send({ fabricante });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const fabricante = await Fabricante.findByIdAndDelete(id)
        return res.send({ fabricante });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/fabricante', router);