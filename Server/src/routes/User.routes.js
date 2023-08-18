const userRouter = require("express").Router();
const userRegister = require("../controllers/users/userRegister");
const userLogin = require("../controllers/users/userLogin");
const authentication = require("../middlewares/authentication");
const setPremium = require("../controllers/users/setPremium");
const getUserById = require("../controllers/users/getUserById");
const putUsername = require("../controllers/users/putUsername");
const getAllUsers = require("../controllers/users/getAllUsers");
const setActive = require("../controllers/users/setActive");

userRouter.post("/register", async (req, res) => {
  const userData = req.body;
  const createdUser = await userRegister(userData);

  if (createdUser.error) {
    return res.status(400).json({ error: createdUser.error });
  } else {
    return res.status(200).json(createdUser);
  }
});

userRouter.post("/login", async (req, res) => {
  const userData = req.body;
  const token = await userLogin(userData);

  if (token.error) {
    return res.status(400).json({ error: token.error });
  } else {
    return res
      .status(200)
      .json({ message: "Usuario autenticado exitosamente.", token });
  }
});

userRouter.put("/setPremium", authentication, async (req, res) => {
  const { userId } = req.user;
  const userModified = await setPremium(userId);

  if (userModified.error) {
    return res.status(400).json({ error: userModified.error });
  } else {
    return res
      .status(200)
      .json({ message: "Usuario modificado correctamente." });
  }
});

userRouter.get("/info/:userId", authentication, async (req, res) => {
  const { userId } = req.params;
  const userFound = await getUserById({
    thisUserId: req.user.userId,
    otherUserId: userId,
  });

  if (userFound.error) {
    return res.status(400).json({ error: userFound.error });
  } else {
    return res.status(200).json(userFound);
  }
});

userRouter.put("/newUsername", authentication, async (req, res) => {
  const { userId } = req.user;
  const { newUsername } = req.body;
  const userModified = await putUsername({ userId, newUsername });

  if (userModified.error) {
    return res.status(400).json({ error: userModified.error });
  } else {
    return res.status(200).json(userModified);
  }
});

userRouter.get("/", async (req, res) => {
  const allUsers = await getAllUsers();

  if (allUsers.error) {
    return res.status(400).json({ error: allUsers.error });
  } else {
    return res.status(200).json(allUsers);
  }
});

userRouter.put("/setActive/:userId", async (req, res) => {
  const { userId } = req.params;
  const modifiedUser = await setActive(userId);

  if (modifiedUser.error) {
    return res.status(400).json({ error: modifiedUser.error });
  } else {
    return res.status(200).json(modifiedUser);
  }
});

module.exports = userRouter;
