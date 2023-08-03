const {Song} = require('../../db')
const categoryRelationship = require('../../helpers/categoryRelationship')

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
    await categoryRelationship(song)
    res.status(201).json(song)
  } catch (error) {
    res.status(404).json(error)
  }
};

const searchId = async(req, res)=>{
  const {id} = req.params
  console.log(id);
 try {
  if(!id) throw new Error("Debe de mandarme id");
  if(typeof id != 'string') throw new Error("El id deve ser un string");
  if(id.length < 5) throw new Error("Tu id es muy corto, revisalo");
  const song = await Song.findByPk(id)

  res.status(200).json(song)
 } catch (error) {
  res.status.json({error: error.message})
 }

}

module.exports = {
  postMusic,
  searchId
};
