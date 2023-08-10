const playListRouter = require("express").Router();
const authentication = require("../middlewares/authentication");
const getAllPlayListsByUserId = require("../controllers/playlists/getAllPlayListsByUserId");
const postPlayList = require("../controllers/playlists/postPlayList");
const getPlayListById = require("../controllers/playlists/getPlayListById");
const addSongToPlayList = require("../controllers/playlists/addSongToPlayList");
const deletePlayList = require("../controllers/playlists/deletePlayList");
const removeSongFromPlayList = require("../controllers/playlists/removeSongFromPlayList");
const putPlayList = require("../controllers/playlists/putPlayList");

playListRouter.get("/", authentication, async (req, res) => {
  const { userId } = req.user;
  const playLists = await getAllPlayListsByUserId(userId);

  if (playLists.error) {
    return res.status(400).json({ error: playLists.error });
  } else {
    return res.status(200).json(playLists);
  }
});

playListRouter.post("/", authentication, async (req, res) => {
  const { userId } = req.user;
  const createdPlayList = await postPlayList({ ...req.body, userId });

  if (createdPlayList.error) {
    return res.status(400).json({ error: createdPlayList.error });
  } else {
    return res.status(200).json(createdPlayList);
  }
});

playListRouter.get("/:playListId", authentication, async (req, res) => {
  const { playListId } = req.params;

  const playList = await getPlayListById(playListId);

  if (playList.error) {
    return res.status(400).json({ error: playList.error });
  } else {
    return res.status(200).json(playList);
  }
});

playListRouter.post("/addSong", authentication, async (req, res) => {
  const { userId } = req.user;
  const songAdded = await addSongToPlayList({ ...req.body, userId });

  if (songAdded.error) {
    return res.status(400).json({ error: songAdded.error });
  } else {
    return res
      .status(200)
      .json({ message: "Canción añadida satisfactoriamente." });
  }
});

playListRouter.delete("/:playListId", authentication, async (req, res) => {
  const { playListId } = req.params;
  const { userId } = req.user;

  const deletedPlayList = await deletePlayList({ playListId, userId });

  if (deletedPlayList.error) {
    return res.status(400).json({ error: deletedPlayList.error });
  } else {
    return res
      .status(200)
      .json({ message: "PlayList eliminada satisfactoriamente." });
  }
});

playListRouter.put("/removeSong", authentication, async (req, res) => {
  const { userId } = req.user;

  const removedSong = await removeSongFromPlayList({ ...req.body, userId });

  if (removedSong.error) {
    return res.status(400).json({ error: removedSong.error });
  } else {
    return res
      .status(200)
      .json({ message: "Canción removida satisfactoriamente." });
  }
});

playListRouter.put("/:playListId", authentication, async (req, res) => {
  const { userId } = req.user;
  const { playListId } = req.params;
  const modifiedPlayList = await putPlayList({
    ...req.body,
    playListId,
    userId,
  });

  if (modifiedPlayList.error) {
    return res.status(400).json({ error: modifiedPlayList.message });
  } else {
    return res.status(200).json(modifiedPlayList);
  }
});

module.exports = playListRouter;
