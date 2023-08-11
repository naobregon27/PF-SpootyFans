const mercadopago = require('mercadopago');
const createOrder = async (req, res) => {

    try {
        const price = Number(req.body.price);
        const quantity = Number(req.body.quantity);
        const description = req.body.description;

        const preference = {
            items: [
                {
                    title: description,
                    unit_price: price,
                    quantity: quantity,
                }
            ],
            back_urls: {
                "success": "http://localhost:3001/feedback",
                "failure": "http://localhost:3001/feedback",
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