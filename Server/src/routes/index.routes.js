const routes = require("express").Router();
const musicRouter = require("./Music.routes");
const userRouter = require("./User.routes");
const categoryRouter = require("./Category.routes");

routes.use("/musica", musicRouter);
routes.use("/user", userRouter);
routes.use("/category", categoryRouter);

module.exports = routes;
