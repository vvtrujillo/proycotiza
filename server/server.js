const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const port = 8000;

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./config/mongo.config');
require('./routes/usuario.route')(app);
require('./routes/maestros/cliente.route')(app);
require('./routes/maestros/producto.route')(app);


app.listen(port, () => console.log('Servidor arriba en puerto ', port));