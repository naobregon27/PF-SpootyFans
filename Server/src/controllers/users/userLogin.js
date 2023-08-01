const { User } = require("../../db");
const verifyPassword = require("../../utils/verifyPassword");

const userLogin = async ({ username, password }) => {
  try {
    if (!username || !password) throw new Error("Datos insuficientes.");

    const userFound = await User.findOne({ where: { username } });

    if (!userFound)
      throw new Error(`El usuario con el username "${username}" no existe.`);

    const passwordVerified = await verifyPassword(password, userFound.password);

    if (!passwordVerified) throw new Error("Contraseña incorrecta.");

    return userFound;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = userLogin;
