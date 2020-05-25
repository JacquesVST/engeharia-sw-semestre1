const express = require('express');
const Venda = require('../models/Venda');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const venda = await Venda.create(req.body).populate('produto');
        
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const vendas = await Venda.find().populate('produto');
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const venda = await Venda.findById(id).populate('produto');
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { produto, data, valor, quantidade, observacao } = req.body;

    try {
        const venda = await Venda.findByIdAndUpdate(
            id,
            {
                produto: produto,
                data: data,
                valor: valor,
                quantidade: quantidade,
                observacao: observacao
            },
            { new: true }
        ).populate('produto');
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const venda = await Venda.findByIdAndDelete(id).populate('produto');
        return res.send({ venda });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});
module.exports = app => app.use('/venda', router);