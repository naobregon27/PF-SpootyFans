const {Song} = require('../../db')
const categoryRelationship = require('../../helpers/categoryRelationship')
const validateParams = require('../../utils/validationsPostMusic/validateDate')

const postMusic = async (req, res) => {
  const {url, name, genre, imageUrl, isActive} = req.body

  try {
    validateParams({
      url,
      name,
      genre,
      imageUrl,
      isActive,
  });

    const song = await  Song.create({
      url,
      name,
      genre,
      imageUrl,
      isActive
    })
    await categoryRelationship(song)
    res.status(201).json(song)
  } catch (error) {
    res.status(404).json(error)
  }
};

const searchId = async(req, res)=>{
  const {id} = req.params
 
 try {
  if(!id) throw new Error("Debe de mandarme id");
  if(typeof Number(id) != 'number') throw new Error("La id debe ser un número");
  const song = await Song.findByPk(Number(id))

  res.status(200).json(song)
 } catch (error) {
  res.status(400).json({ error: error.message });
 }

}

module.exports = {
  postMusic,
  searchId
};
