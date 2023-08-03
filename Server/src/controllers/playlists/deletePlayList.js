const { PlayList } = require("../../db");

const deletePlayList = async ({ playListId, userId }) => {
  try {
    if (!playListId || !userId) throw new Error("Datos insuficientes.");

    const playListFound = await PlayList.findByPk(playListId);

    if (!playListFound)
      throw new Error(
        `No se ha encontrado la PlayList con la id: ${playListId}.`
      );

    if (playListFound.UserId !== userId)
      throw new Error(
        "Sólo el usuario creador de la PlayList puede eliminarla."
      );

    const deletedPlayList = await PlayList.destroy({
      where: {
        id: playListId,
      },
    });

    if (!deletedPlayList)
      throw new Error("Ha ocurrido un error al intentar eliminar la PlayList.");

    return "PlayList eliminada satisfactoriamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = deletePlayList;
