const mongoose = require('../database');

const VendaSchema = new mongoose.Schema({
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        require: true,
    },
    data: {
        type: Date,
        require: true,
    },
    valor: {
        type: Number,
    },
    quantidade: {
        type: Number,
        default: 1,
    },
    observacao: {
        type: String,
    },
});

const Venda = mongoose.model('Venda', VendaSchema);

module.exports = Venda;