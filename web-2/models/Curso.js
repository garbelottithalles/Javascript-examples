const mongoose = require('mongoose')
const Curso = mongoose.Schema({
    tema: {
        type: String,
        required: true,
        unique: true
    },
    descricao: [{
        type: String,
        default:''
    }],
    aluno: {
        type: String,
        //ref: 'Usuario',
        default: ''
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('cursos', Curso)