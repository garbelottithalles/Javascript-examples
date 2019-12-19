const mongoose = require('mongoose')
const Upload = new mongoose.Schema({
    name: String,
    size: Number, 
    key: String,
    nome: {
        type: String,
        default: __filename
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('uploads', Upload)