const { User } = require("../../db");

const setActive = async (userId) => {
  try {
    if (!userId) throw new Error("Datos insuficientes.");

    const userFound = await User.findByPk(userId);

    if (!userFound)
      throw new Error(
        `No se ha encontrado ningún usuasrio con la id: ${userId}.`
      );
    
     const userModified = await User.update(
       { isActive: !userFound.isActive },
       { where: { id: userId } }
    );
    
    if (!userModified) throw new Error('Ha ocurrido un error al intentar modificar el usuario.')

    return 'El usuario se ha modificado satisfactoriamente.'
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = setActive;
