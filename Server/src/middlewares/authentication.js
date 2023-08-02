const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return res
      .status(403)
      .json({ error: "No se ha enviado el token de autenticación" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
  return next();
};

module.exports = verifyToken;
