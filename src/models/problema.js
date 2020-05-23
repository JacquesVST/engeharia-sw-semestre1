const mongoose = require('../database');

const ProblemaSchema = new mongoose.Schema({
    descricao: {
        type: String,
        require: true,
    },
    procedimentos: {
        type: [String],
    },
    observacao: {
        type: String,
    },
});

const Problema = mongoose.model('Problema', ProblemaSchema);

module.exports = Problema;