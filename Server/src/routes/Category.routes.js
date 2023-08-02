const categoryRouter = require("express").Router();
const { getCategoryById, getAllCategory } = require("../controllers/category/getCategoryById");


categoryRouter.get('/category', async (req, res) => {
    const AllCategory = await getAllCategory();

    try {
        res.status(200).json(AllCategory);
    } catch (error) {
        return res.status(404).send(error.message)

    }
});

categoryRouter.get("/category/:id", async(req, res)=> {
    const { id } = req.params;

    try {
        if(id) {
            const categoryById = await getCategoryById(id);

            if (categoryById.error) return res.status(404).json(categoryById);
            return res.status(200).json(categoryById);
        } else {
            const AllCategory = await getAllCategory();
            return res.status(200).json(AllCategory);
        }

    } catch(error) {
        return res.status(404).send(error.message);
    }

});





module.exports = categoryRouter;
