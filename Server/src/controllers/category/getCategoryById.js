const { Category, Song } = require('../../db');
//const {Op} = require ("sequelize")


const getAllCategory = async () => await Category.findAll({
    include: {
        model: Song,
        as: "Song",
        attributes: ["id", "name", "description"],
            through: { attributes: [] },
    },
});

const getCategoryById = async (id) => {
    const categoryFilterId = await Category.findOne({
        where: { id },
        include: {
            model: Song,
            as: "Song",
            attributes: ["id", "name", "description"],
            through: { attributes: [] },
        },
    });

    if (categoryFilterId) return categoryFilterId;
    return { error: `No hay categoria con el ID: ${id}` };
}

module.exports= {
    getCategoryById,
    getAllCategory,
}