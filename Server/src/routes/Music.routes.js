const musicRouter = require('express').Router();
const multer = require('multer');
const {
  postMusic,
  searchId,
  rateSong
} = require("../controllers/music/music.controller"); 
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
    return res.status(400).json({ error: songs.error });
  } else {
    return res.status(200).json(songs);
  }
});

musicRouter.get("/all", authentication, async (req, res) => {
  const songs = await Song.findAll();
  return res.status(200).json(songs);
});


musicRouter.post("/rate", rateSong);


module.exports = musicRouter;