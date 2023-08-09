const { Sequelize } = require("sequelize");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/railway`,
  {
    logging: false,
    native: false,
  }
);

// Cargamos los archivos de modelos dinámicamente
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, "models", file))(sequelize);
    modelDefiners.push(model);
  });

// Extraemos los modelos:
const { User, Song, PlayList, Category } = sequelize.models;

// Ceramos las relaciones entre los modelos
Song.belongsToMany(PlayList, { through: "song_playList" });
PlayList.belongsToMany(Song, { through: "song_playList" });
Song.belongsToMany(Category, { through: "song_category" });
Category.belongsToMany(Song, { through: "song_category" });
User.hasMany(Song);
Song.belongsTo(User);
User.hasMany(PlayList);
PlayList.belongsTo(User);
 

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
