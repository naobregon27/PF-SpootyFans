const { Song } = require("../db");
const { Op } = require("sequelize");

const getSongByNameAndArtist = async (songName, songArtist) => {
  try {
    if (!songName && !songArtist) throw new Error("Nombre o artista inválido");

    const buscarpor = {};

    if (songName) {
      buscarpor.name = { [Op.like]: `%${songName}%` };
    }

    if (songArtist) {
      buscarpor.artist = { [Op.like]: `%${songArtist}%` };
    }

    const songsFound = await Song.findAll({
      where: buscarpor,
    });


    if (songsFound.length === 0)
      throw new Error("No se encontraron canciones con ese nombre o de ese artista");

    return songsFound;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {getSongByNameAndArtist}
