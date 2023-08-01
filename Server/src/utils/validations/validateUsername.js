const validateUsername = (username) => {
  try {
    if (username.length < 4)
      throw new Error("El nombre de usuario debe tener al menos 4 caracteres.");

    if (
      !/^[\u{0}-\u{D7FF}\u{E000}-\u{FFFF}\u{10000}-\u{10FFFF}]*$/u.test(
        username
      )
    )
      throw new Error("El nombre de usuario incluye caracteres inválidos.");

    return username;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = validateUsername;
