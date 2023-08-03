const musicRouter = require('express').Router();
const multer = require('multer');
const { postMusic, searchId } = require("../controllers/music/music.controller"); // Importa directamente el controlador y su función
const getSongByName = require("../helpers/getMusicByName");
const {Song} = require("../db")
const categoryRelationship = require('../helpers/categoryRelationship')

// Configurar Multer para guardar el archivo temporal en la carpeta 'uploads'
const upload = multer({ dest: "uploads/" });

musicRouter.get('/detail/:id', async(req, res)=>{
  const {id} = req.params
  console.log(id);
 try {
  if(!id) throw new Error("Debe de mandarme id");
 
  const song = await Song.findByPk(id)
  categoryRelationship(song)
  res.status(200).json(song)
 } catch (error) {
  res.status(401).json({error: error.message})
 }

})

musicRouter.post("/upload/url", upload.single("file"), postMusic); 
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