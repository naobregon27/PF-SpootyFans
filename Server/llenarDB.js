const { users, songs, playLists, categories, rating } = require("./data");
const { User, PlayList, Song, Category, Rating } = require("./src/db");
const categoryRelationship = require('./src/helpers/categoryRelationship')

module.exports = () => {
  users.forEach(({ username, password, email, isPremium, isActive }) => {
    const newUser = {
      username,
      password,
      email,
      isPremium,
      isActive,
    };
    User.create(newUser);
  });

  songs.forEach(async ({ name, genre, url, imageUrl, isActive, averageRating }) => {
    const newSong = {
      name,
      genre,
      url,
      imageUrl,
      isActive,
      averageRating
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

  rating.forEach(async ({userId, idSong, stars})=>{
    const newRating = {
      userId,
      idSong,
      stars
    }
    await Rating.create(newRating)
  })

};
