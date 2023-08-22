const { Song } = require("../../db");

const putSongName = async ({ songId, newName }) => {
  try {
    if (!songId || !newName) throw new Error("Datos insuficientes.");

    const songFound = await Song.findByPk(songId);

    if (!songFound)
      throw new Error(`No se ha encontrado la canción con la id: ${songId}.`);

    const modifiedSong = await Song.update(
      { name: newName },
      { where: { id: songId } }
    );

    if (!modifiedSong)
      throw new Error("Ha ocurrido un error al modificar la canción.");

    return "El nombre se ha modificado satisfactoriamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = putSongName;
