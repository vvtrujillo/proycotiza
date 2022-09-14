const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    razonsocial:{
        type: String,
        required: [true, 'la razon social es requerida'],
        minlength: [3, 'la razon social debe tener 3 caracteres minimo']
    },
    email:{
        type: String,
        required: [true, 'el email es requerido']
    }
}, {timestamps: true})

const ClienteMaestro = mongoose.model('ClienteMaestro', ClienteSchema);

module.exports = ClienteMaestro;