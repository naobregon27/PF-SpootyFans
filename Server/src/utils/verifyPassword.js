const bcrypt = require("bcrypt");

const verifyPassword = async (password, hashedPassword) => {
  try {
    // Utilizamos el método compare de bcrypt para verificar si ambas contraseñas coinciden
    const isMatch = await bcrypt.compare(password, hashedPassword);
    // Retornamos el resultado (boolean)
    return isMatch;
  } catch {
    throw new Error("Error al verificar la contraseña.");
  }
};

module.exports = verifyPassword;
