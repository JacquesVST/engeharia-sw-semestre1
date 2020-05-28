const express = require('express');
const HistoricoSituacao = require('../models/HistoricoSituacao');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const historicoSituacao = await (await HistoricoSituacao.create(req.body)).populate('servico');
        
        return res.send({ historicoSituacao });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const historicoSituacoes = await HistoricoSituacao.find().populate('servico');
        return res.send({ historicoSituacoes });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/filtrar', async (req, res) => {
    try {
        const historicoSituacoes = await HistoricoSituacao.find(req.body.filtro).sort(req.body.ordem).populate('servico');
        return res.send({ historicoSituacoes });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Filtrar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const historicoSituacao = await HistoricoSituacao.findById(id).populate('servico');
        return res.send({ historicoSituacao });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { servico, data, situacao, observacao } = req.body;

    try {
        const historicoSituacao = await HistoricoSituacao.findByIdAndUpdate(
            id,
            {
                servico: servico,
                data: data,
                situacao: situacao,
                observacao: observacao
            },
            { new: true }
        ).populate('servico');
        return res.send({ historicoSituacao });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const historicoSituacao = await HistoricoSituacao.findByIdAndDelete(id).populate('servico');
        return res.send({ historicoSituacao });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});
module.exports = app => app.use('/historico-situacao', router);