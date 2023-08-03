const { Category, Song } = require("../../db");

const getAllCategory = async () =>
  await Category.findAll({
    include: {
      model: Song,
      through: { attributes: [] },
    },
  });

const getCategoryById = async (id) => {
  const categoryFilterId = await Category.findOne({
    where: { id },
    include: {
      model: Song,
      through: { attributes: [] },
    },
  });

  if (categoryFilterId) return categoryFilterId;
  return { error: `No hay categoria con el ID: ${id}` };
};

module.exports = {
  getCategoryById,
  getAllCategory,
};
