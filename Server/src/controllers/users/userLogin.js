const { User } = require("../../db");
const verifyPassword = require("../../utils/verifyPassword");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async ({ username, email, password, isThirdPartyLogin }) => {
  try {
    if (!username || (!password && !isThirdPartyLogin))
      throw new Error("Datos insuficientes.");

    const userFound = isThirdPartyLogin
      ? await User.findOne({ where: { email } })
      : await User.findOne({ where: { username } });

    if (!userFound)
      throw new Error(`El usuario con el username "${username}" no existe.`);

    if (!userFound.isActive) throw new Error(`El usuario "${username}" no tiene acceso a la aplicación.`)

    if (!isThirdPartyLogin) {
      const passwordVerified = await verifyPassword(
        password,
        userFound.password
      );

      if (!passwordVerified) throw new Error("Contraseña incorrecta.");
    }

    const payload = {
      userId: userFound.id,
      username: userFound.username,
      email: userFound.email,
      profileImageUrl: userFound.profileImageUrl,
      isActive: userFound.isActive,
      isPremium: userFound.isPremium,
      isAdmin: userFound.isAdmin,
    };

    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
    return token;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = userLogin;
