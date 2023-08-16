const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require("dotenv").config();

const {ACCESS_TOKEN} = process.env;

const routes = require('./routes/index.routes')
const app = express();
const mercadopago = require("mercadopago");

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


//routes
app.use('/', routes);

//mercadopago

mercadopago.configure({
	access_token: ACCESS_TOKEN,
});


module.exports = app