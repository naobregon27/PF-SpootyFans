const { Song, PlayList } = require("../../db");

const removeSongFromPlayList = async ({ songId, playListId, userId }) => {
  try {
    if (!songId || !playListId || !userId)
      throw new Error("Datos insuficientes.");

    const songFound = await Song.findByPk(songId);

    if (!songFound)
      throw new Error(`No se ha encontrado la canción con la id: ${songId}.`);

    const playListFound = await PlayList.findByPk(playListId);

    if (!playListFound)
      throw new Error(
        `No se ha encontrado la PlayList con la id: ${playListId}.`
      );

    if (playListFound.UserId !== userId)
      throw new Error(
        "Sólo el usuario creador de la PlayList puede remover canciones."
      );

    await playListFound.removeSong(songFound);

    return "Canción removida correctamente";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = removeSongFromPlayList;
