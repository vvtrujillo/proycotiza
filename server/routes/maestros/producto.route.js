const ProductoController = require('../../controllers/maestros/producto.controller');
const {autenticar} = require('../../config/jwt.config');

module.exports = (app) => {
    app.get('/api/v1/productos', autenticar, ProductoController.listar);
    app.get('/api/v1/productos/:id', autenticar, ProductoController.listarPorId);
    app.post('/api/v1/productos', autenticar, ProductoController.crear);
    app.delete('/api/v1/productos/:id', autenticar, ProductoController.eliminar);
    app.put('/api/v1/productos/:id', autenticar, ProductoController.actualizar);
}