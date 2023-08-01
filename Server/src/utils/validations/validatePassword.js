const validatePassword = (password) => {
  try {
    if (password.length < 8)
      throw new Error("La contraseña debe tener al menos 8 caracteres.");

    if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password))
      throw new Error(
        "La contraseña debe contener al menos una letra y un número."
      );

    if (
      !/^[\u{0}-\u{D7FF}\u{E000}-\u{FFFF}\u{10000}-\u{10FFFF}]*$/u.test(
        password
      )
    )
      throw new Error("La contraseña incluye caracteres inválidos.");

    return password;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = validatePassword;
