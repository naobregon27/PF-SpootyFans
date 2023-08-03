const {Category, song_category} = require('../db');

const categoryRelationship = async (genre) => {
    try {
        
        const songId = genre.id;
        const songCate = genre.genre
     
        let songCategory = await song_category.findOne({ where: { SongId: songId } });

        if (!songCategory) {
    
            const newCategory = await Category.create({ name: songCate, description: 'New Category Description' });

            
            songCategory = await song_category.create({ SongId: songId, CategoryId: newCategory.id });

            console.log('Created a new category and associated it with the given genre.');
        }
        const category = await Category.findOne({ where: { id: songCategory.CategoryId } });
        console.log('Associated category:', category ? category.name : 'Category not found.');
    } catch (error) {
        console.error('Error fetching/creating the associated category:', error);
    }
};

module.exports = categoryRelationship;
