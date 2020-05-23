const express = require('express');
const HistoricoSituacao = require('../models/HistoricoSituacao');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const historicoSituacao = await HistoricoSituacao.create(req.body);
        
        return res.send({ historicoSituacao });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});

router.get('/listar', async (req, res) => {
    try {
        const historicoSituacoes = await HistoricoSituacao.find();
        return res.send({ historicoSituacoes });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const historicoSituacao = await HistoricoSituacao.findById(id);
        return res.send({ historicoSituacao });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

module.exports = app => app.use('/historico-situacao', router);