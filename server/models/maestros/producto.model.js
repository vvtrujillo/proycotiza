const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    codigo:{
        type: String,
        required: [true, 'El codigo del producto es requerido.'],
        minlength: [2, 'El codigo debe tener 2 caracteres como minimo']
    },
    nombre:{
        type: String,
        required: [true, 'el nombre del producto es requerido.'],
        minlength: [3, 'el nombre del producto debe tener 5 caracteres como minimo.']        
    },
    descripcion:{
        type: String        
    },
    unidad:{
        type: String,
        required: [true, 'la unidad es requerida'],
        minlength: [3, 'la unidad debe ser al menos de 2 caracteres.']
    },
    valor:{
        type: Number,
        required: [true, 'El valor del producto es requerido'],
        min: 0        
    }
},{timestamps: true})

const ProductoMaestro = mongoose.model('ProductoMaestro', ProductoSchema);

module.exports = ProductoMaestro;