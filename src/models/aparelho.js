const mongoose = require('../database');

const AparelhoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    modelo: {
        type: String,
        require: true,
    },
    fabricante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fabricante',
        require: true,
    },
    fichaTecnica: {
        type: String,
    },
    siteOficial: {
        type: String,
    },
    observacao: {
        type: String,
    },
});

const Aparelho = mongoose.model('Aparelho', AparelhoSchema);

module.exports = Aparelho;