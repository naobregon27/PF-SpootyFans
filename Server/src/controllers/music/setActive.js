const { Song } = require("../../db");

const setActive = async (songId) => {
  try {
    if (!songId) throw new Error("Datos insuficientes.");

    const songFound = await Song.findByPk(songId);

    if (!songFound)
      throw new Error(
        `No se ha encontrado ninguna canción con la id: ${songId}.`
      );

    const songModified = await Song.update(
      { isActive: !songFound.isActive },
      { where: { id: songId } }
    );

    if (!songModified)
      throw new Error("Ha ocurrido un error al intentar modificar la canción.");

    return "La canción se ha modificado satisfactoriamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = setActive;
