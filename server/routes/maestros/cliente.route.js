const ClienteController = require('../../controllers/maestros/cliente.controller');
const {autenticar} = require('../../config/jwt.config');

module.exports = (app) => {
    app.get('/api/v1/clientes', autenticar, ClienteController.listar);
    app.post('/api/v1/clientes', autenticar, ClienteController.crear);
    app.delete('/api/v1/clientes/:id', autenticar, ClienteController.eliminar);
    app.get('/api/v1/clientes/:id', autenticar, ClienteController.listarPorId);
    app.put('/api/v1/clientes/:id', autenticar, ClienteController.actualizar)
}