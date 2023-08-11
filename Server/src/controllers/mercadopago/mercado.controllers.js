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
            },
          ],
          back_urls: {
            // local
            // success: "http://localhost:5173/create",
            //   failure: "http://localhost:5173/home",

            // deploy
            success: "pf-spooty-fans-two.vercel.app/create",
            failure: "pf-spooty-fans-two.vercel.app/home",

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