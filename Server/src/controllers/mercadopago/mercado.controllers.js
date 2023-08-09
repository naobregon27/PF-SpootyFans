
const createOrder = async () => {

    let preference = {
        items: [
            {
                title: req.body.description,
                unit_price: Number(req.body.price),
                quantity: Number(req.body.quantity),
            }
        ],
        back_urls: {
            "success": "http://localhost:3001/feedback",
            "failure": "http://localhost:3001/feedback",
            //"pending": "http://localhost:3001/feedback"
        },
        auto_return: "approved",
    };


    const result = await mercadopago.preferences.create(preference)
        .then(function (response) {
            res.json({
                id: response.body.id
            });
        }).catch(function (error) {
            console.log(error);
        });


    console.log(result)
}


module.exports = {
    createOrder,
}