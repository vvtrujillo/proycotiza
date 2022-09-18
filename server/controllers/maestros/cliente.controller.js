const ClienteMaestro = require('../../models/maestros/cliente.model');

module.exports.listar = (req,res) => {
    ClienteMaestro.find().sort({razonsocial:1})
        .then(resp =>{
            res.json({
                dataClient: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al traer los clientes.'
            })
        })
}

module.exports.crear = (req,res) => {
    ClienteMaestro.create(req.body)    
        .then(resp => {
            console.log('crea cliente',req.body)
            res.json({
                dataClient: resp,
                error: false
            })
        }).catch(e => {
            console.log('crea cliente',req.body, e)
            res.json({                
                error: true,
                mensaje: 'Ha ocurrido un error al crear el cliente.'
            })
        })
}

module.exports.eliminar = (req, res) => {
    ClienteMaestro.findByIdAndDelete(req.params.id)
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