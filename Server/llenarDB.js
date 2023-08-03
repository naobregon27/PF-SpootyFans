const { users, songs, playLists, categories } = require("./data");
const { User, PlayList, Song, Category } = require("./src/db");
const categoryRelationship = require('./src/helpers/categoryRelationship')

module.exports = () => {
  users.forEach(({ username, password, isPremium, isActive }) => {
    const newUser = {
      username,
      password,
      isPremium,
      isActive,
    };
    User.create(newUser);
  });

  songs.forEach(async ({ name, genre, url, imageUrl, isActive }) => {
    const newSong = {
      name,
      genre,
      url,
      imageUrl,
      isActive,
    };
    const song = await Song.create(newSong);
    await categoryRelationship(song)
  });

  playLists.forEach(({ name, likes }) => {
    const newPlayList = {
      name,
      likes
    }
    PlayList.create(newPlayList)
  })

  categories.forEach(({ name, description }) => {
    const newCategory = {
      name,
      description
    }
    Category.create(newCategory)
  })
};
