const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt.config')


module.exports.registrar = (req, res) => {
     Usuario.create(req.body)
        .then(usuario => {            
            res.json({
                error: false,
                mensaje: 'El usuario se ha registrado exitosamente'
            })
        }).catch(e => {
            console.error(e);
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error'
            })
        });
}

module.exports.listar = (req,res) => {
    Usuario.find()
        .then(resp =>{
            res.json({
                dataUsuarios: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'error al listar los usuarios.'
            })
        })
}

module.exports.login = (req, res) => {
    Usuario.findOne({email: req.body.username})    
        .then(usuario => {
            console.log(req.body.username);
            if(usuario == null) {
                res.json({
                    error: true,
                    mensaje: 'Usuario o Contraseña no válido'
                });
            } else {
                bcrypt.compare(req.body.password, usuario.password)
                    .then(valido => {
                        if(valido) {
                        console.log('login',req.body.password, usuario.password);
                        const payload = {
                            _id: usuario._id,
                            nombre: usuario.nombre,
                            apellido: usuario.apellido,
                            email: usuario.email
                        }
                        const newJWT = jwt.sign(payload, secretKey);
                          res
                            .cookie("usertoken", newJWT, secretKey, {
                              httpOnly: true
                            })
                            .json({ error: false, datos: payload});
                        } else {
                            res.json({
                                error: true,
                                mensaje: 'Usuario o Contraseña no válido'
                            });
                        }
                    })
            }
        })
}