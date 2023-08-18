const { Category } = require("../../db");

const setActive = async (categoryId) => {
  try {
    if (!categoryId) throw new Error("Datos insuficientes.");

    const categoryFound = await Category.findByPk(categoryId);

    if (!categoryFound)
      throw new Error(
        `No se ha encontrado ninguna categoría con la id: ${categoryId}.`
      );

    const categoryModified = await Category.update(
      { isActive: !categoryFound.isActive },
      { where: { id: categoryId } }
    );

    if (!categoryModified)
      throw new Error(
        "Ha ocurrido un error al intentar modificar la categoría."
      );

    return "La categoría se ha modificado satisfactoriamente.";
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = setActive;
