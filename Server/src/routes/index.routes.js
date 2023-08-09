const routes = require("express").Router();
const musicRouter = require("./Music.routes");
const userRouter = require("./User.routes");
const categoryRouter = require("./Category.routes");
const playListRouter = require("./PlayList.routes");
//router MercadoPago
const mercadoPagoRouter = require("./MercadoPago.routes")


routes.use("/music", musicRouter);
routes.use("/user", userRouter);
routes.use("/category", categoryRouter);
routes.use("/playlist", playListRouter);

//mercadoPago

routes.use("/pago", mercadoPagoRouter);

module.exports = routes;
