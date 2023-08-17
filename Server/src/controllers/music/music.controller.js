const {Song, Rating} = require('../../db')
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
};

const rateSong = async ({stars, idSong, userId}) => {
  
  try {
    if(userId === undefined || stars === undefined || idSong === undefined) {  

      throw new Error("VEO QUE ANDAS ESCASO DE DATOS") ;

    }

    const existingRating = await Rating.findOne({
      where: { userId: userId, idSong: idSong  },
    });
    
    if (existingRating) {
      throw new Error("You have already rated this song") ;
    }

    await Rating.create({ userId: userId, idSong: idSong, stars: stars });

    //*actualizar la calificacion promedio de la canción
    
    //const song = await Song.findByPk(idSong);
    const ratings = await Rating.findAll({ where: { idSong: idSong } });

    let totalRating = 0;
    for (const r of ratings) {
      totalRating += r.stars ;
    }
    
    //song.averageRating = Math.floor(totalRating / ratings.length); 
    const average = Math.floor(totalRating / ratings.length)

    await Song.update({averageRating: average}, {where:{id: idSong}})
    
    //await song.save();
    

    return ("Thanks for the rating") ;
  } catch (error) {
    return  {error: error.message} 
  }
};




module.exports = {
  postMusic,
  searchId,
  rateSong,
};
