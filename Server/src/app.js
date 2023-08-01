const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/index.routes')
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/', routes);

module.exports = app