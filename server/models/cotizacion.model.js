const mongoose = require('mongoose');

const CotizacionSchema = new mongoose.Schema({
    cliente:{
        type: String,
        required: [true, 'el cliente es requerido para la cotización.'],        
    },
    producto:{
        type: String,
        required: [true, 'el producto es requerido para la cotización.']
    },
    cantidad:{
        type: Number,
        required: [true, 'la cantidad es requerida para la cotización.'],
        min: 0
    },
    valortotal:{
        type: Number        
    },
    usuariocreador:{
        type: String
    }
}, {timestamps: true})

const Cotizacion = mongoose.model('Cotizacion', CotizacionSchema);

module.exports = Cotizacion;