const mercadoPagoRouter = require("express").Router();
const {
    createOrder,
} = require("../controllers/mercadopago/mercado.controllers");
// const authentication = require("../middlewares/authentication.js");

mercadoPagoRouter.get("/", function () {
    res.status(200).sendFile(/*"index.html"*/);//de client
});

mercadoPagoRouter.post("/create_preference", async (req, res) => {

    const Order = await createOrder();

    try {
        res.status(200).json(Order);
    } catch (error) {
        return res.status(404).send(error.massage);
    }

    
});

//informacion de la compra
mercadoPagoRouter.get('/feedback', function (req, res) {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    });
});




module.exports = mercadoPagoRouter;