const playListRouter = require("express").Router();
const authentication = require("../middlewares/authentication");
const getAllPlayListsByUserId = require("../controllers/playlists/getAllPlayListsByUserId");
const postPlayList = require("../controllers/playlists/postPlayList");
const getPlayListById = require("../controllers/playlists/getPlayListById");
const addSongToPlayList = require("../controllers/playlists/addSongToPlayList");

playListRouter.get("/", authentication, async (req, res) => {
  const { userId } = req.user;
  const playLists = await getAllPlayListsByUserId(userId);

  if (playLists.error) {
    res.status(400).json({ error: playLists.error });
  } else {
    res.status(200).json(playLists);
  }
});

playListRouter.post("/", authentication, async (req, res) => {
  const { userId } = req.user;
  const createdPlayList = await postPlayList({ ...req.body, userId });

  if (createdPlayList.error) {
    res.status(400).json({ error: createdPlayList.error });
  } else {
    res.status(200).json(createdPlayList);
  }
});

playListRouter.get("/:playListId", authentication, async (req, res) => {
  const { playListId } = req.params;

  const playList = await getPlayListById(playListId);

  if (playList.error) {
    res.status(400).json({ error: playList.error });
  } else {
    res.status(200).json(playList);
  }
});

playListRouter.post("/addSong", authentication, async (req, res) => {
  const songAdded = await addSongToPlayList(req.body);

  if (songAdded.error) {
    res.status(400).json({ error: songAdded.error });
  } else {
    res.status(200).json({ message: "Canción añadida satisfactoriamente." });
  }
});

module.exports = playListRouter;
