const {Song} = require('../../db')

const postMusic = async (req, res) => {
  const {url, name, genre, imageUrl, isActive} = req.body

  try {
    const song = await  Song.create({
      url,
      name,
      genre,
      imageUrl,
      isActive
    })

    res.status(201).json(song)
  } catch (error) {
    res.status(404).json(error)
  }
};

module.exports = {
  postMusic,
};
