const db = require("./posts");
const Comentarios = require("./comentariosdb");
const { DataTypes, Model } = require('sequelize');


class Post extends Model{}

Post.init({
    nome: {
       type: DataTypes.STRING
    },
    tipodepost: {
        type: DataTypes.TEXT
    },
    personid:{
        type: DataTypes.INTEGER
    },
    profileimage:{
        type: DataTypes.STRING
    }
},
{
    sequelize: db.sequelize,
    modelName: "Post"
})

/*const Post = db.sequelize.define('posts', {
    nome: db.Sequelize.STRING,
    tipodepost: db.Sequelize.TEXT,
    personid: db.Sequelize.INTEGER
});

*/


Post.hasMany(Comentarios, {foreignKey: 'postid'});
Comentarios.belongsTo(Post, {foreignKey: 'id'});

module.exports = Post;