const categoryRouter = require("express").Router();
const {
  getCategoryById,
  getAllCategory,
} = require("../controllers/categories/getCategoryById");
const authentication = require("../middlewares/authentication");
const setActive = require("../controllers/categories/setActive");
const postCategory = require("../controllers/categories/postCategory");
const putCategoryName = require('../controllers/categories/putCategoryName')

categoryRouter.get("/", async (req, res) => {
  const AllCategories = await getAllCategory();

  try {
    res.status(200).json(AllCategories);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

categoryRouter.get("/:id", authentication, async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const categoryById = await getCategoryById(id);

      if (categoryById.error) return res.status(404).json(categoryById);
      return res.status(200).json(categoryById);
    } else {
      const AllCategory = await getAllCategory();
      return res.status(200).json(AllCategory);
    }
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

categoryRouter.put("/setActive/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const modifiedCategory = await setActive(categoryId);

  if (modifiedCategory.error) {
    return res.status(400).json({ error: modifiedCategory.error });
  } else {
    return res.status(200).json(modifiedCategory);
  }
});

categoryRouter.post("/", async (req, res) => {
  const { name } = req.body;
  const createdCategory = await postCategory(name);

  if (createdCategory.error) {
    return res.status(400).json({ error: createdCategory.error });
  } else {
    return res.status(200).json(createdCategory);
  }
});

categoryRouter.put("/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  const { newName } = req.body;

  const modifiedCategory = await putCategoryName({ categoryId, newName });

  if (modifiedCategory.error) {
    return res.status(400).json({ error: modifiedCategory.error });
  } else {
    return res.status(200).json(modifiedCategory);
  }
});



module.exports = categoryRouter;
