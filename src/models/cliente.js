const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    cpf: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    dataNascimento: {
        type: Date,
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
    telefone: {
        type: String,
    },
    observacao: {
        type: String,
    },
});

ClienteSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;