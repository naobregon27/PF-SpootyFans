const mercadopago = require('mercadopago');
const createOrder = async (req, res) => {

    try {

        const preference = {
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                }
            ],
            back_urls: {
                "success": "http://localhost:5173/create",
                "failure": "http://localhost:5173/create",
                //"pending": "http://localhost:3001/feedback"
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);
        const preferenceId = response.body.id;

        res.status(200).json({
            id: preferenceId
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error creating preference"
        });
    }
}


module.exports = {
    createOrder,
}