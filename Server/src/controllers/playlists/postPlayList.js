const { PlayList, User } = require("../../db");

const postPlayList = async ({ name, userId }) => {
  try {
    if (!name || !userId) throw new Error("Datos insuficientes.");

    const userFound = await User.findByPk(userId);

    if (!userFound)
      throw new Error(`No se ha encontrado el usuario con la id: ${userId}.`);

    const newPlayList = await PlayList.create({ name, UserId: userId });

    if (!newPlayList) throw new Error("Error al crear la PlayList.");

    return newPlayList;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = postPlayList;
