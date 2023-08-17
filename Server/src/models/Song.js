const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Song = sequelize.define(
    "Song",
    {
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      averageRating:{
        type: DataTypes.INTEGER,
        allowNull:true
      },
    },
    { timestamps: false }
  );
  return Song;
};
