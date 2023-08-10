const { User } = require("../../db");

const getUserById = async ({ thisUserId, otherUserId }) => {
  try {
    if (!thisUserId && !otherUserId) throw new Error("Datos insuficientes.");

    if (otherUserId === "this") {
      const userFound = await User.findByPk(thisUserId);
      if (!userFound)
        throw new Error(`No se encontró el usuario con la id: ${thisUserId}`);

      const userInfo = {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        profileImageUrl: userFound.profileImageUrl,
        isPremium: userFound.isPremium,
        isActive: userFound.isActive,
        isAdmin: userFound.isAdmin,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      };

      return userInfo;
    }

    const userFound = await User.findByPk(otherUserId);

    if (!userFound)
      throw new Error(`No se encontró el usuario con la id: ${thisUserId}`);

    const userInfo = {
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      profileImageUrl: userFound.profileImageUrl,
      isPremium: userFound.isPremium,
      isActive: userFound.isActive,
      isAdmin: userFound.isAdmin,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    };

    return userInfo;
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getUserById;
