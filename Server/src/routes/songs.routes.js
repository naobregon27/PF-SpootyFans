const routes = require("express").Router();
const getSongByName = require("../controllers/users/getUserByUsername");

routes.get('/', async (req, res) => {
  const { name } = req.query

  const songs = await getSongByName(name)

  if (songs.error) {
    res.status(400).json({ error: songs.error })
  } else {
    res.status(200).json(songs)
  }
})

module.exports = routes