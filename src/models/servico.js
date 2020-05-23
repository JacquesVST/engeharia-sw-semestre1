const mongoose = require('../database');

const ServicoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true,
    },
    aparelho: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aparelho',
        require: true,
    },
    problema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problema',
        require: true,
    },
    situacao: {
        type: String,
        default: 'solicitado',
        require: true,
    },
    valor: {
        type: Number,
    },
    dataRegistro: {
        type: Date,
        default: Date.now,
    },
    observacao: {
        type: String,
    },
});

const Servico = mongoose.model('Servico', ServicoSchema);

module.exports = Servico;