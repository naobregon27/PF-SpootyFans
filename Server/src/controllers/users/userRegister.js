const { User } = require("../../db");
const passwordEncrypt = require("../../utils/passwordEncrypt");
const validatePassword = require("../../utils/validations/validatePassword");
const validateUsername = require("../../utils/validations/validateUsername");

const userRegister = async ({ username, password, isActive, isPremium }) => {
  try {
    // Verificamos si llegan todos los datos necesarios
    if (
      !username ||
      !password ||
      isActive === undefined ||
      isPremium === undefined
    )
      throw new Error("Datos insuficientes.");

    // Verificamos si el tipo de dato de isActive e isPremium son los esperados
    if (typeof isActive !== "boolean" || typeof isPremium !== "boolean")
      throw new Error(
        'El tipo de dato de "isActive" o "isPremium" no era el esperado.'
      );

    // Verificamos si existe un usuario con es nombre
    const existUser = await User.findOne({ where: { username } });

    // Si el usuario existe arrojamos un error
    if (existUser)
      throw new Error(`El usario con el nombre "${username}" ya existe.`);

    // Creamos una variable para almacenar el nombre de usuario validado
    const validatedUsername = validateUsername(username);

    // Verificamos si surgió algún error con el nombre de usuario
    if (validatedUsername.error) throw new Error(validatedUsername.error);

    // Creamos una variable para almacenar la contraseña validada
    const validatedPassword = validatePassword(password);

    // Verificamos si surgió algún error con la contraseña
    if (validatedPassword.error) throw new Error(validatedPassword.error);

    // Si todo salió bien, creamos el nuevo usuario y encriptamos la password
    const newUser = {
      username: validatedUsername,
      password: await passwordEncrypt(validatedPassword),
      isActive,
      isPremium,
    };

    // Almacenamos el nuevo usuario en la base de datos
    const createdUser = await User.create(newUser);

    // Arrojamos un error si el usuario no se guarda correctamente
    if (!createdUser) throw new Error("Error al crear el usuario.");

    // Si el usuario se almacena correctamente en la base de datos, lo retornamos
    return createdUser;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = userRegister;
