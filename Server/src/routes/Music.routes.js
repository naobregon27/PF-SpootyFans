const musicRouter = require('express').Router();
const multer = require('multer');
const {
  postMusic,
  searchId,
  rateSong
} = require("../controllers/music/music.controller"); 
const {getSongByNameAndArtist} = require("../helpers/getMusicByName");
const {Song} = require("../db")
const categoryRelationship = require('../helpers/categoryRelationship')
const authentication = require("../middlewares/authentication");
const setActive = require("../controllers/music/setActive");
const putSongName = require("../controllers/music/putSongName");

// Configurar Multer para guardar el archivo temporal en la carpeta 'uploads'
const upload = multer({ dest: "uploads/" });

musicRouter.get("/detail/:id", authentication, searchId);

musicRouter.post("/upload/url", upload.single("file"), postMusic);

musicRouter.get("/", authentication, async (req, res) => {
  const { name, artist } = req.query;

  const songs = await getSongByNameAndArtist(name, artist);

  if (songs.error) {
    return res.status(400).json({ error: songs.error });
  } else {
    return res.status(200).json(songs);
  }
});

musicRouter.get("/all", async (req, res) => {
  const songs = await Song.findAll();
  return res.status(200).json(songs);
});

musicRouter.put("/setActive/:songId", async (req, res) => {
  const { songId } = req.params;
  const modifiedSong = await setActive(songId);

  if (modifiedSong.error) {
    return res.status(400).json({ error: modifiedSong.error });
  } else {
    return res.status(200).json(modifiedSong);
  }
});

musicRouter.post("/rate", authentication, async (req, res) => {
  const { userId } = req.user;

  const rate = await rateSong({ ...req.body, userId });
  if (rate.error) {
    return res.status(400).json({ error: rate.error });
  } else {
    return res.status(200).json({ message: "Thanks for rating" });
  }
});

musicRouter.put("/:songId", async (req, res) => {
  const { songId } = req.params;
  const { newName } = req.body;

  const modifiedSong = await putSongName({ songId, newName });

  if (modifiedSong.error) {
    return res.status(400).json({ error: modifiedSong.error });
  } else {
    return res.status(200).json(modifiedSong);
  }
});

module.exports = musicRouter;