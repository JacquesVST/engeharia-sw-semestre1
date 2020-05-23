const mongoose = require('../database');

const PecaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        require: true,
    },
    servico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico',
        require: true,
    },
    dataPedido: {
        type: Date,
        require: true,
    },
    dataChegada: {
        type: Date,
    },
    categoria: {
        type: String,
        require: true,
    },
    origem: {
        type: String,
    },
    fabricante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fabricante',
    },
    valor: {
        type: Number,
    },
    observacao: {
        type: String,
    },
});

const Peca = mongoose.model('Peca', PecaSchema);

module.exports = Peca;