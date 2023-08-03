const { Song, PlayList } = require("../../db");

const addSongToPlayList = async ({ songId, playListId }) => {
  try {
    if (!songId || !playListId) throw new Error("Datos insuficientes.");

    const songFound = await Song.findByPk(songId);

    if (!songFound)
      throw new Error(`No se ha encontrado la canción con la id: ${songId}.`);

    const playListFound = await PlayList.findByPk(playListId);

    if (!playListFound)
      throw new Error(
        `No se ha encontrado la PlayList con la id: ${playListId}.`
      );

    await playListFound.addSong(songFound);

    return "Canción añadida correctamente";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = addSongToPlayList;
