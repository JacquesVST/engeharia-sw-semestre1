const mongoose = require('../database');

const HistoricoSituacaoSchema = new mongoose.Schema({
    servico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Servico',
        require: true,
    },
    data: {
        type: Date,
        require: true,
    },
    situacao: {
        type: String,
        require: true,
    },
    observacao: {
        type: String,
    },
});

const HistoricoSituacao = mongoose.model('HistoricoSituacao', HistoricoSituacaoSchema);

module.exports = HistoricoSituacao; 