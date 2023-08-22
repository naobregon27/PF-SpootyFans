const { Category } = require("../../db");

const putCategoryName = async ({ categoryId, newName }) => {
  try {
    if (!categoryId || !newName) throw new Error("Datos insuficientes.");

    const categoryFound = await Category.findByPk(categoryId);

    if (!categoryFound)
      throw new Error(`No se ha encontrado la categoría con la id: ${categoryId}.`);

    const modifiedCategory = await Category.update(
      { name: newName },
      { where: { id: categoryId } }
    );

    if (!modifiedCategory)
      throw new Error("Ha ocurrido un error al modificar la categoría.");

    return "El nombre se ha modificado satisfactoriamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = putCategoryName;
