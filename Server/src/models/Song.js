const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Song",
    {
      url: {
        type: DataTypes.STRING,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
