const { Song } = require("../../db");
const { Op } = require("sequelize");

const getSongByName = async (songName) => {
  try {
    if (!songName) throw new Error("Nombre inválido");

    const songsFound = await Song.findAll({
      where: { name: { [Op.like]: `%${songName}%` } },
    });

    if (songsFound.length === 0)
      throw new Error("No se encontraron canciones con ese nombre");

    return songsFound;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getSongByName;
