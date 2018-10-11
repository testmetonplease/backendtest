// @flow

export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    _id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    __v: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    author: DataTypes.UUID,
    parentId: DataTypes.UUID,
    articleId: DataTypes.UUID,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
  }, {
    classMethods: {
      associate: (models) => {
        Comment.belongsTo(models.Blog, { foreignKey: 'articleId' });
        Comment.hasMany(models.Comments);
        Comment.belongsTo(models.Comments, { foreignKey: 'parentId' });
        Comment.belongsTo(models.User, { foreignKey: 'author' });
      },
    },
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeDestroy: comment => Comment
        .update({
          status: 'deleted',
        }, {
          where: {
            _id: comment._id,
          },
        })
        .then(() => 'Comment deleted'),
    },
  });

  return Comment;
};
