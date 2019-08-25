//Librerias Requeridas
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const  cors = require('cors')

const mongoose     = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost:27017/characters', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

//Creación de la aplicación
const app = express();
app.use(cors())
//Puerto para servicio
app.set('port', process.env.PORT || 8090);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Modulos de aplicación
var models     = require('./api/model/characters')(app, mongoose);
app.use('/api/characters', require('./api/characters'));



//Página de error default para recursos no encontrados
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//Inicia servicio escuchando en el puerto especificado
app.listen(app.get('port'), 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening on port ' + app.get('port'));
});

module.exports = app;
