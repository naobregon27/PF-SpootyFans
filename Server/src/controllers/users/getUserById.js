const { User } = require("../../db");

const getUserById = async ({ thisUserId, otherUserId }) => {
  try {
    if (!thisUserId && !otherUserId) throw new Error("Datos insuficientes.");

    if (otherUserId === "this") {
      const userFound = await User.findByPk(thisUserId);
      if (!userFound)
        throw new Error(`No se encontró el usuario con la id: ${thisUserId}`);

      return userFound;
    }

    const userFound = await User.findByPk(otherUserId);

    if (!userFound)
      throw new Error(`No se encontró el usuario con la id: ${thisUserId}`);

    return userFound;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getUserById;
