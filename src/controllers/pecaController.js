const express = require('express');
const Peca = require('../models/Peca');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const peca = await (await Peca.create(req.body)).populate({
            path: 'servico fabricante',
            populate: {
                path: 'cliente aparelho problema',
                populate: {
                    path: 'fabricante'
                }
            }
        });

        return res.send({ peca });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const pecas = await Peca.find().populate({
            path: 'servico fabricante',
            populate: {
                path: 'cliente aparelho problema',
                populate: {
                    path: 'fabricante'
                }
            }
        });
        return res.send({ pecas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/filtrar', async (req, res) => {
    try {
        let filtro = JSON.parse(req.query.filtro)
        const pecas = await Peca.find(filtro).sort(req.query.ordem).populate({
            path: 'servico fabricante',
            populate: {
                path: 'cliente aparelho problema',
                populate: {
                    path: 'fabricante'
                }
            }
        });
        return res.send({ pecas });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Filtrar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const peca = await Peca.findById(id).populate({
            path: 'servico fabricante',
            populate: {
                path: 'cliente aparelho problema',
                populate: {
                    path: 'fabricante'
                }
            }
        });
        return res.send({ peca });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { descricao, servico, dataPedido, dataChegada, categoria, origem, fabricante, valor, observacao } = req.body;

    try {
        const peca = await Peca.findByIdAndUpdate(
            id,
            {
                descricao: descricao,
                servico: servico,
                dataPedido: dataPedido,
                dataChegada: dataChegada,
                categoria: categoria,
                origem: origem,
                fabricante: fabricante,
                valor: valor,
                observacao: observacao
            },
            { new: true }
        ).populate({
            path: 'servico fabricante',
            populate: {
                path: 'cliente aparelho problema',
                populate: {
                    path: 'fabricante'
                }
            }
        });
        return res.send({ peca });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const peca = await Peca.findByIdAndDelete(id).populate({
            path: 'servico fabricante',
            populate: {
                path: 'cliente aparelho problema',
                populate: {
                    path: 'fabricante'
                }
            }
        });
        return res.send({ peca });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/peca', router);