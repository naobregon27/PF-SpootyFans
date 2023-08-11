const { User } = require("../../db");

const putUsername = async ({ userId, newUsername }) => {
  try {
    if (!userId || !newUsername) throw new Error("Datos insuficientes.");

    const userFound = await User.findByPk(userId);

    if (!userFound)
      throw new Error(`No se ha encontrado el usuario con la id: ${userId}.`);

    const userModified = await User.update(
      { username: newUsername },
      { where: { id: userId } }
    );

    if (!userModified)
      throw new Error(
        "Ha ocurrido un error al intentar modificar el ususario."
      );

    return "Usuario modificado exitosamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = putUsername;
