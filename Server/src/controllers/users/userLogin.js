const { User } = require("../../db");
const verifyPassword = require("../../utils/verifyPassword");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async ({ username, password }) => {
  try {
    if (!username || !password) throw new Error("Datos insuficientes.");

    const userFound = await User.findOne({ where: { username } });

    if (!userFound)
      throw new Error(`El usuario con el username "${username}" no existe.`);

    const passwordVerified = await verifyPassword(password, userFound.password);

    if (!passwordVerified) throw new Error("Contraseña incorrecta.");

    const payload = {
      userId: userFound.id,
      username: userFound.username,
      isActive: userFound.isActive,
      isPremium: userFound.isPremium,
    };

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    return token;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = userLogin;
