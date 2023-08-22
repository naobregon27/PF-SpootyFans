const { Category } = require("../../db");

const postCategory = async (name) => {
  try {
    if (!name) throw new Error("Datos insuficientes.");

    const newCategory = await Category.create({ name });

    if (!newCategory)
      throw new Error("Ha ocurrido un error al intentar crear la categoría.");

    return newCategory;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = postCategory;
