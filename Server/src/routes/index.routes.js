const routes = require('express').Router();
const songsRoutes = require('./songs.routes')

routes.use('/songs', songsRoutes)

module.exports = routes