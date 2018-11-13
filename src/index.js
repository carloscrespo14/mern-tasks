'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const { mongoose } = require('./database')
const app = express();


//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
//app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

//Routes
app.use('/api', require('./routes/task.route'));

//Statics
console.log(path.join(__dirname, 'public'))

app.use(express.static(path.join(__dirname, 'public')))
//inicializar servidor
app.listen(app.get('port'), () =>{
    console.log(`server running on localhost:${app.get('port')}`);
});