const {
  cloudinary,
  CLOUDINARY_URL,
} = require("../../config/cloudinary.config");


/*
Recibe un archivo y hace la peticion a cloudinary para guardarlo
  @params: Object 
*/
//Sin terminar aun
const uploadMusic = async (file) => {
  cloudinary
    .uploader(file, {
      resource_type: "sound",
      public_id: "myfolder/mysubfolder/dog_closeup",
      chunk_size: 6000000,
      eager: [
        { width: 300, height: 300, crop: "pad", audio_codec: "none" },
        {
          width: 160,
          height: 100,
          crop: "crop",
          gravity: "south",
          audio_codec: "",
        },
      ],
      eager_async: true,
      eager_notification_url: "https://mysite.example.com/notify_endpoint",
    })
    .then((result) => console.log(result));
};

module.exports = uploadMusic