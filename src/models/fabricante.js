const mongoose = require('../database');

const FabricanteSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    siteOficial: {
        type: String,
    },
    contatoprincipal: {
        type: String,
    },
    contatoSecundario: {
        type: String,
    },
    observacao: {
        type: String,
    },
});

const Fabricante = mongoose.model('Fabricante', FabricanteSchema);

module.exports = Fabricante;