const ProductoController = require('../../controllers/maestros/producto.controller');
const {autenticar} = require('../../config/jwt.config');

module.exports = (app) => {
    app.get('/api/v1/productos', autenticar, ProductoController.listar);
    app.post('/api/v1/productos', autenticar, ProductoController.crear);
    app.delete('/api/v1/productos/:id', autenticar, ProductoController.eliminar);
}