const userRouter = require("express").Router();
const userRegister = require("../controllers/users/userRegister");

userRouter.post("/register", async (req, res) => {
  // Extraemos los datos del body
  const userData = req.body;
  // Enviamos los datos del usuario a la función de registro y almacenamos su retorno en una variable
  const createdUser = await userRegister(userData);

  if (createdUser.error) {
    // Respondemos con un error en caso de que algo salga mal
    res.status(400).json({ error: createdUser.error });
  } else {
    // Respondemos con el usuario en caso de que todo salga bien
    res.status(200).json(createdUser);
  }
});

module.exports = userRouter;
