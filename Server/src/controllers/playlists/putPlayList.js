const { PlayList } = require("../../db");

const putPlayList = async ({ playListId, newName, userId }) => {
  try {
    if (!playListId || !newName || !userId)
      throw new Error("Datos insuficientes.");

    const playListFound = await PlayList.findByPk(playListId);

    if (!playListFound)
      throw new Error(
        `No se ha encontrado la PlayList con la id: ${playListId}.`
      );

    if (playListFound.UserId !== userId)
      throw new Error(
        "Sólo el usuario creador de la PlayList puede modificarla."
      );

    const modifiedPlayList = await PlayList.update(
      { name: newName },
      {
        where: { id: playListId },
      }
    );

    if (!modifiedPlayList)
      throw new Error("Ha ocurrido un error al modificar la PlayList.");

    return "PlayList modificada correctamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = putPlayList;
