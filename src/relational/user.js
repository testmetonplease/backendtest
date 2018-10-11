// @flow
import authHelpers from '../core/_helpers';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isUnique: authHelpers.uniqueEmail },
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'USER',
    },
  }, {
    classMethods: {
      associate: (models) => {
        User.hasMany(models.Comments);
        User.hasMany(models.Blog);
      },
    },
  });

  return User;
};
