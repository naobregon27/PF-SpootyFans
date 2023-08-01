const routes = require('express').Router();
const musicRouter = require('./Music.routes')

routes.use("/musica", musicRouter);

module.exports = routes