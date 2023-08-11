const mercadoPagoRouter = require("express").Router();
const {
    createOrder,
} = require("../controllers/mercadopago/mercado.controllers");
// const authentication = require("../middlewares/authentication.js");

mercadoPagoRouter.get("/", function () {
    res.status(200).sendFile(/*"index.html"*/);//de client
});

mercadoPagoRouter.post("/create_preference", async (req, res) => {
    try {
        await createOrder(req, res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Error creating preference"
        });
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