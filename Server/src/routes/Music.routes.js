const musicRouter = require('express').Router();
const multer = require('multer');
const { postMusic } = require("../controllers/music/music.controller"); // Importa directamente el controlador y su función
const getSongByName = require("../controllers/music/getMusicByName");

// Configurar Multer para guardar el archivo temporal en la carpeta 'uploads'
const upload = multer({ dest: "uploads/" });

musicRouter.post("/upload/url", upload.single("file"), postMusic); // Usa la función directamente sin .uploadFile

musicRouter.get("/", async (req, res) => {
  const { name } = req.query;

  const songs = await getSongByName(name);

  if (songs.error) {
    res.status(400).json({ error: songs.error });
  } else {
    res.status(200).json(songs);
  }
});

module.exports = musicRouter;
