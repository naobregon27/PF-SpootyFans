const { users, songs, playLists, categories } = require("./data");
const { User, PlayList, Song, Category } = require("./src/db");

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

  songs.forEach(({ name, genre, url, isActive }) => {
    const newSong = {
      name,
      genre,
      url,
      isActive,
    };
    Song.create(newSong);
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
