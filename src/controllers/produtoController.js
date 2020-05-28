const express = require('express');
const Produto = require('../models/Produto');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const produtos = await Produto.find();
        return res.send({ produtos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/filtrar', async (req, res) => {
    try {
        const produtos = await Produto.find(req.body.filtro).sort(req.body.ordem);
        return res.send({ produtos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Filtrar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const produto = await Produto.findById(id);
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { descricao, dataPedido, dataChegada, custo, preco, categoria, estoque, origem, observacao } = req.body;

    try {
        const produto = await Produto.findByIdAndUpdate(
            id,
            {
                descricao: descricao,
                dataPedido: dataPedido,
                dataChegada: dataChegada,
                custo: custo,
                preco: preco,
                categoria: categoria,
                estoque: estoque,
                origem: origem,
                observacao: observacao
            },
            { new: true }
        );
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const produto = await Produto.findByIdAndDelete(id);
        return res.send({ produto });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/produto', router);