const mongoose = require('../database');

const ProdutoSchema = new mongoose.Schema({
    descricao: {
        type: String,
        require: true,
    },
    dataPedido: {
        type: Date,
        require: true,
    },
    dataChegada: {
        type: Date,
    },
    custo: {
        type: Number,
        required: true,
    },
    preco: {
        type: Number,
    },
    categoria: {
        type: String,
        require: true,
    },
    estoque: {
        type: Number,
        default: 1,
    },
    origem: {
        type: String,
    },
    observacao: {
        type: String,
    },
});

const Produto = mongoose.model('Produto', ProdutoSchema);

module.exports = Produto;