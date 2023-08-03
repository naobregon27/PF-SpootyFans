const routes = require("express").Router();
const musicRouter = require("./Music.routes");
const userRouter = require("./User.routes");
const categoryRouter = require("./Category.routes");
const playListRouter = require("./PlayList.routes");

routes.use("/music", musicRouter);
routes.use("/user", userRouter);
routes.use("/category", categoryRouter);
routes.use("/playlist", playListRouter);

module.exports = routes;
