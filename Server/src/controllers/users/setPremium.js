const { User } = require("../../db");
const emailer = require("../../../nodemailer/emailer")

const setPremium = async (userId) => {
  try {
    if (!userId) throw new Error("Datos insuficientes.");

    const userFound = await User.findByPk(userId);

    if (!userFound)
      throw new Error(`No se ha encontrado el usuario con la id: ${userId}.`);

    const userModified = await User.update(
      { isPremium: !userFound.isPremium },
      { where: { id: userId } }
    );

    if (!userModified) throw new Error("Error al modificar el usuario.");

    emailer.sendMailPremium(userModified);

    return "Usuario modificado correctamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = setPremium;