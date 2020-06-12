const express = require('express');
const Servico = require('../models/Servico');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    try {
        const servico = await Servico.create(req.body);
        // const servico = await Servico.create(req.body).populate({
        //     path: 'cliente aparelho problema',
        //     populate: {
        //         path: 'fabricante'
        //     }
        // });

        return res.send({ servico });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Registrar' });
    }
});


router.get('/listar', async (req, res) => {
    try {
        const servicos = await Servico.find().populate({
            path: 'cliente aparelho problema',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ servicos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Listar' });
    }
});

router.get('/filtrar', async (req, res) => {
    try {
        const servicos = await Servico.find(req.body.filtro).sort(req.body.ordem).populate({
            path: 'cliente aparelho problema',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ servicos });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Filtrar' });
    }
});

router.get('/buscar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const servico = await Servico.findById(id).populate({
            path: 'cliente aparelho problema',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ servico });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Buscar' });
    }
});

router.put('/alterar/:id', async (req, res) => {
    const id = req.params.id;
    const { cliente, aparelho, problema, situacao, valor, observacao } = req.body;

    try {
        const servico = await Servico.findByIdAndUpdate(
            id,
            {
                cliente: cliente,
                aparelho: aparelho,
                problema: problema,
                situacao: situacao,
                valor: valor,
                observacao: observacao
            },
            { new: true }
        ).populate({
            path: 'cliente aparelho problema',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ servico });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Alterar' });
    }
});

router.delete('/deletar/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const servico = await Servico.findByIdAndDelete(id).populate({
            path: 'cliente aparelho problema',
            populate: {
                path: 'fabricante'
            }
        });
        return res.send({ servico });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Falha ao Deletar' });
    }
});

module.exports = app => app.use('/servico', router);