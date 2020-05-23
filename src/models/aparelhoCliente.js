const mongoose = require('../database');

const AparelhoClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    modelo: {
        type: String,
    },
    aparelho: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aparelho'
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true,
    },
    dataAquisicao: {
        type: Date
    },
    observacao: {
        type: String,
    },
});

const AparelhoCliente = mongoose.model('AparelhoCliente', AparelhoClienteSchema);

module.exports = AparelhoCliente;