// @flow

export default (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
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
    metaTitle: DataTypes.STRING,
    metaDescription: DataTypes.STRING,
    metaKeywords: DataTypes.STRING,
    body: DataTypes.STRING,
    authorName: DataTypes.STRING,
    author: DataTypes.UUID,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new',
    },
  }, {
    classMethods: {
      associate: (models) => {
        Blog.hasMany(models.Comments);
        Blog.belongsTo(models.User, { foreignKey: 'author' });
      },
    },
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeDestroy: blog => Blog
        .update({
          status: 'deleted',
        }, {
          where: {
            _id: blog._id,
          },
        })
        .then(() => 'Blog deleted'),
    },
  });

  return Blog;
};
