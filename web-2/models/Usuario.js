const mongoose = require('mongoose')
const Usuario = mongoose.Schema({
    nome: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required:true,
        select: false
    },
    endereco: {
        type: String
    },
    dataI: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('usuarios', Usuario)


