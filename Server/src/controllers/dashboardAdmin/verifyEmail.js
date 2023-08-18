const { User } = require("../../db");
require("dotenv").config();
const emailer = require("../../../nodemailer/emailer");

const verifyEmail = async (email) => {
  try {
    if (!email) throw new Error("Datos insuficientes.");

    const userFound = await User.findOne({ where: { email } });

    if (!userFound)
      throw new Error("No hay ningún usuario registrado con ese email.");

    if (!userFound.isAdmin)
      throw new Error(
        `El usuario con el email ${email} no tiene permisos de administrador.`
      );

    const verificationCode =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    emailer.sendVerifyCode({
      email: userFound.email,
      verificationCode: verificationCode,
    });

    return { code: verificationCode };
  } catch (error) {
    return { error: error.message };
  }
};
