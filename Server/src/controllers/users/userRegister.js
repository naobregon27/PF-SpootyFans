const { User } = require("../../db");
const passwordEncrypt = require("../../utils/passwordEncrypt");
const validatePassword = require("../../utils/validations/validatePassword");
const validateUsername = require("../../utils/validations/validateUsername");
const emailer = require("../../../nodemailer/emailer")

const userRegister = async ({
  username,
  password,
  email,
  profileImageUrl,
  isThirdPartyLogin,
}) => {
  try {
    if (!username || (!password && !isThirdPartyLogin) || !email)
      throw new Error("Datos insuficientes.");

    const existUser = isThirdPartyLogin
      ? await User.findOne({ where: { email } })
      : await User.findOne({ where: { username } });

    if (existUser && !isThirdPartyLogin)
      throw new Error(`El usario con el nombre "${username}" ya existe.`);

    if (existUser && isThirdPartyLogin)
      throw new Error(`El usario con el email "${email}" ya existe.`);

    if (!isThirdPartyLogin) {
      const validatedUsername = validateUsername(username);

      if (validatedUsername.error) throw new Error(validatedUsername.error);

      const validatedPassword = validatePassword(password);

      if (validatedPassword.error) throw new Error(validatedPassword.error);

      const newUser = {
        username: validatedUsername,
        password: await passwordEncrypt(validatedPassword),
        email,
      };

      const createdUser = await User.create(newUser);

      if (!createdUser) throw new Error("Error al crear el usuario.");

      const userInfo = {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        profileImageUrl: createdUser.profileImageUrl,
        isPremium: createdUser.isPremium,
        isActive: createdUser.isActive,
        isAdmin: createdUser.isAdmin,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      };

      emailer.sendMailRegister(createdUser);

      return userInfo;
    }

    const newUser = {
      username,
      email,
      profileImageUrl,
    };

    const createdUser = await User.create(newUser);

    if (!createdUser) throw new Error("Error al crear el usuario.");

    const userInfo = {
      id: createdUser.id,
      username: createdUser.username,
      email: createdUser.email,
      profileImageUrl: createdUser.profileImageUrl,
      isPremium: createdUser.isPremium,
      isActive: createdUser.isActive,
      isAdmin: createdUser.isAdmin,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
    emailer.sendMailRegister(userInfo);
    
    return userInfo;

  } catch (error) {
    return { error: error.message };
  }
};

module.exports = userRegister;