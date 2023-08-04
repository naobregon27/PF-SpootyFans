const userRouter = require("express").Router();
const userRegister = require("../controllers/users/userRegister");
const userLogin = require("../controllers/users/userLogin");

userRouter.post("/register", async (req, res) => {
  const userData = req.body;
  const createdUser = await userRegister(userData);

  if (createdUser.error) {
    res.status(400).json({ error: createdUser.error });
  } else {
    res.status(200).json(createdUser);
  }
});

userRouter.post("/login", async (req, res) => {
  const userData = req.body;
  const token = await userLogin(userData);

  if (token.error) {
    res.status(400).json({ error: token.error });
  } else {
    res
      .status(200)
      .json({ message: "Usuario autenticado exitosamente.", token });
  }
});

module.exports = userRouter;
