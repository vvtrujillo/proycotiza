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

module.exports.crear = (req, res) => {
    ProductoMaestro.create(req.body)
        .then(resp => {
            console.log('crea producto',req.body)
            res.json({
                dataProduct:resp,
                error: false
            })
        }).catch(e => {
            console.log('crea producto',req.body,'error',e)
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al crear un Producto'
            })
        })
}