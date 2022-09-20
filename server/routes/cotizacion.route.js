const CotizacionController = require('../controllers/cotizacion.controller');
const {autenticar} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/v1/cotizaciones', autenticar, CotizacionController.listar);
    app.post('/api/v1/cotizaciones', autenticar, CotizacionController.crear);
    app.get('/api/v1/cotizaciones/pdf/:id', autenticar, CotizacionController.crearPdf);
}


