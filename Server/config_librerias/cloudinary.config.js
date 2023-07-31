const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const { CLOUD_NAME, CLOUD_KEY, CLOUD_API } = process.env

//configure cloudnary || Agregar a un env los datos       
cloudinary.config({ 
  cloud_name: CLOUD_NAME, 
  api_key: CLOUD_KEY, 
  api_secret: CLOUD_API 
});

const CLOUDINARY_URL=`cloudinary://${CLOUD_KEY}:${CLOUD_API}@${CLOUD_NAME}`


module.exports = {
    cloudinary,
    CLOUDINARY_URL
}