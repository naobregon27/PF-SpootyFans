const { User } = require("../../db");

const getAllUsers = async () => {
  try {
    const allUsers = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    if (!allUsers)
      throw new Error("Ha ocurrido un error al obtener todos los usuarios.");

    return allUsers;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getAllUsers;
