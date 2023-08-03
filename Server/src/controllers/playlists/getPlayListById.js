const { PlayList, Song } = require("../../db");

const getPlayListById = async (playListId) => {
  try {
    if (!playListId) throw new Error("Debe enviar la id de la PlayList.");

    const playListFound = await PlayList.findByPk(playListId, {
      include: {
        model: Song,
        through: { attributes: [] },
      },
    });

    if (!playListFound)
      throw new Error(
        `No se ha encontrado la PlayList con la id: ${playListId}.`
      );

    return playListFound;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getPlayListById;
