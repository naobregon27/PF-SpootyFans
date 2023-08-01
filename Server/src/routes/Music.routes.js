const musicRouter = require('express').Router();
const multer = require('multer');
const { postMusic } = require('../controllers/music.controller'); // Importa directamente el controlador y su función

// Configurar Multer para guardar el archivo temporal en la carpeta 'uploads'
const upload = multer({ dest: 'uploads/' });

musicRouter.post('/upload/url', upload.single('file'), postMusic); // Usa la función directamente sin .uploadFile

module.exports = musicRouter;
