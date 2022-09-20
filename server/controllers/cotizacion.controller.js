const Cotizacion = require('../models/cotizacion.model');
const PDFDocument = require('pdfkit');
const fs = require('fs');



module.exports.listar=(req, res) => {
    Cotizacion.find()
        .then(resp =>{
            res.json({
                dataCotizacion: resp,
                error: false
            })
        }).catch(e => {
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al listar las cotizaciones'
            })
        })
}

module.exports.crear = (req, res) => {
    Cotizacion.create(req.body)
        .then(resp => {
            console.log('crea producto',req.body)
            res.json({
                dataCotizacion:resp,
                error: false
            })
        }).catch(e => {
            console.log('crea producto',req.body,'error',e)
            res.json({
                error: true,
                mensaje: 'Ha ocurrido un error al crear una cotización'
            })
        })
}

module.exports.crearPdf = (req, res) => {
    Cotizacion.findById(req.params.id)
        .then(resp =>{
            console.log('resp: ', resp);
            let pdfDoc = new PDFDocument;
            pdfDoc.pipe(fs.createWriteStream('./pdfs/SampleDocument.pdf'));
            pdfDoc.text(`${resp.cliente}, ${resp.producto}, ${resp.cantidad}`);
            pdfDoc.end();
            console.log('pdf: ', pdfDoc);
            res.download('./SampleDocument.pdf');
        })    
}