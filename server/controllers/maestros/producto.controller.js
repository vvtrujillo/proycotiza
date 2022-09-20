const ProductoMaestro = require('../../models/maestros/producto.model');

module.exports.listar=(req, res) => {
    ProductoMaestro.find()
        .then(resp =>{
            res.json({
                dataProduct: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al listar los productos'
            })
        })
}

module.exports.listarPorId = (req,res) => {    
    ProductoMaestro.findById(req.params.id)
        .then(resp =>{
            res.json({
                dataProduct: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al traer los clientes.'
            })
        })
}

module.exports.crear = (req, res) => {
    ProductoMaestro.create(req.body)
        .then(resp => {            
            res.json({
                dataProduct:resp,
                error: false
            })
        }).catch(e => {            
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al crear un Producto'
            })
        })
}

module.exports.eliminar = (req, res) => {
    ProductoMaestro.findByIdAndDelete(req.params.id)
        .then(resp => {
            res.json({
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error'
            })
        });
}

module.exports.actualizar = (req, res) => {
    ProductoMaestro.findByIdAndUpdate(req.params.id, req.body, { runValidators:true })
        .then(resp => {
            res.json({
                dataProduct: req.body,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error'
            })
        });
}