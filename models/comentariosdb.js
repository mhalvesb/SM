const db = require("./comentarios");
const Post = require("./postsdb");
const { DataTypes, Model } = require('sequelize');

class Comentarios extends Model {}
Comentarios.init({
    nome: {
        type: DataTypes.STRING
    },
    comentario: {
        type: DataTypes.STRING
    },
    postid: {
        type: DataTypes.INTEGER
    },
    profileimage:{
        type: DataTypes.STRING
    }
},
{
    sequelize: db.sequelize,
    modelName: "Comentarios"
});

/*const coment = db.sequelize.define("comentarios", {
    nome: db.Sequelize.STRING,
    comentario: db.Sequelize.STRING,
    postid: db.Sequelize.INTEGER
});
*/




    
    

module.exports = Comentarios;