const userRouter = require("express").Router();
const userRegister = require("../controllers/users/userRegister");
const userLogin = require("../controllers/users/userLogin");

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

userRouter.post("/login", async (req, res) => {
  // Extraemos los datos del body
  const userData = req.body;
  // Enviamos los datos del usuario a la función de login y almacenamos su retorno en una variable
  const loggedUser = await userLogin(userData);

  if (loggedUser.error) {
    // Respondemos con un error en caso de que algo salga mal
    res.status(400).json({ error: loggedUser.error });
  } else {
    // Respondemos con el usuario en caso de que todo salga bien
    res.status(200).json(loggedUser);
  }
});

module.exports = userRouter;