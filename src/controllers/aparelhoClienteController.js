const express = require('express');
const AparelhoCliente = require('../models/AparelhoCliente');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const aparelhoCliente = await AparelhoCliente.create(req.body).populate({
            path: 'cliente aparelho',
            populate: {
                path: 'fabricante'
            }
        });
        
        return res.send({ aparelhoCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const aparelhosCliente = await AparelhoCliente.find().populate({
            path: 'cliente aparelho',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ aparelhosCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const aparelhoCliente = await AparelhoCliente.findById(id).populate({
            path: 'cliente aparelho',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ aparelhoCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, modelo, aparelho, cliente, dataAquisicao, observacao } = req.body;

    try {
        const aparelhoCliente = await AparelhoCliente.findByIdAndUpdate(
            id,
            {
                nome: nome,
                modelo: modelo,
                aparelho: aparelho,
                cliente: cliente,
                dataAquisicao: dataAquisicao,
                observacao: observacao
            },
            { new: true }
        ).populate({
            path: 'cliente aparelho',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ aparelhoCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const aparelhoCliente = await AparelhoCliente.findByIdAndDelete(id).populate({
            path: 'cliente aparelho',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ aparelhoCliente });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/aparelho-cliente', router);