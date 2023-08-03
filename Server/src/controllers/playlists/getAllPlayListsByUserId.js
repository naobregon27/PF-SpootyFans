const { PlayList } = require("../../db");

const getAllPlayListsByUserId = async (userId) => {
  try {
    if (!userId) throw new Error("La id de usuario no es válida.");

    const allPlayLists = await PlayList.findAll({ where: { userId } });

    return allPlayLists;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getAllPlayListsByUserId;
