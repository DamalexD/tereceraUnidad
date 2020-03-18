const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/sample_airbnb')
    .then(db => console.log('Conectado a Mongo'))
    .catch(err => console.log(err));

const indexRoutes = require('./routes/index')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

app.use('/', indexRoutes);

app.listen(port, function(){
    console.log('Server on port: ' + port);
});