const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    // Define la seguridad del encriptado
    const saltRounds = 10;
    // Genera el salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Encripta la contraseña utilizando el salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch {
    throw new Error("Error al encriptar la contraseña.");
  }
};

module.exports = hashPassword;
