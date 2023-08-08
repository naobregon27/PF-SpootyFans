const { User } = require("../../db");
const passwordEncrypt = require("../../utils/passwordEncrypt");
const validatePassword = require("../../utils/validations/validatePassword");
const validateUsername = require("../../utils/validations/validateUsername");

const userRegister = async ({
  username,
  password,
  email,
  isActive,
  isPremium,
  isThirdPartyLogin,
}) => {
  try {
    if (
      !username ||
      (!password && !isThirdPartyLogin) ||
      !email ||
      isActive === undefined ||
      isPremium === undefined
    )
      throw new Error("Datos insuficientes.");

    if (typeof isActive !== "boolean" || typeof isPremium !== "boolean")
      throw new Error(
        'El tipo de dato de "isActive" o "isPremium" no era el esperado.'
      );

    const existUser = await User.findOne({ where: { username } });

    if (existUser)
      throw new Error(`El usario con el nombre "${username}" ya existe.`);

    if (!isThirdPartyLogin) {
      const validatedUsername = validateUsername(username);

      if (validatedUsername.error) throw new Error(validatedUsername.error);

      const validatedPassword = validatePassword(password);

      if (validatedPassword.error) throw new Error(validatedPassword.error);

      const newUser = {
        username: validatedUsername,
        password: await passwordEncrypt(validatedPassword),
        email,
        isActive,
        isPremium,
      };

      const createdUser = await User.create(newUser);

      if (!createdUser) throw new Error("Error al crear el usuario.");

      return createdUser;
    }
    const newUser = {
      username,
      email,
      isActive,
      isPremium,
    };

    const createdUser = await User.create(newUser);

    if (!createdUser) throw new Error("Error al crear el usuario.");

    return createdUser;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = userRegister;
