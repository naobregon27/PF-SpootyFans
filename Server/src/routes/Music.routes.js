const musicRouter = require('express').Router();
const multer = require('multer');
const { postMusic, searchId } = require("../controllers/music/music.controller"); // Importa directamente el controlador y su función
const getSongByName = require("../helpers/getMusicByName");
const {Song} = require("../db")
const categoryRelationship = require('../helpers/categoryRelationship')
const authentication = require("../middlewares/authentication");

// Configurar Multer para guardar el archivo temporal en la carpeta 'uploads'
const upload = multer({ dest: "uploads/" });

musicRouter.get("/detail/:id", authentication, searchId);

musicRouter.post("/upload/url", upload.single("file"), postMusic);

musicRouter.get("/", authentication, async (req, res) => {
  const { name } = req.query;

  const songs = await getSongByName(name);

  if (songs.error) {
    res.status(400).json({ error: songs.error });
  } else {
    res.status(200).json(songs);
  }
});

musicRouter.get("/all", authentication, async (req, res) => {
  const songs = await Song.findAll();
  res.status(200).json(songs);
});


module.exports = musicRouter;