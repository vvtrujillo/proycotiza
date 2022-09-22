const UsuarioController = require('../controllers/usuario.controller');
//const {autenticar} = require('../../config/jwt.config');

module.exports = (app) => {
    app.post('/api/v1/usuario', UsuarioController.registrar);
    app.post('/api/v1/login', UsuarioController.login);
    app.get('/api/v1/usuario',UsuarioController.listar);
}