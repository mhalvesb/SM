const db = require("./usuarios");






const usuarios = db.sequelize.define('usuarios', {
    nome: db.Sequelize.STRING,
    login: db.Sequelize.STRING,
    senha: db.Sequelize.STRING,
    email: db.Sequelize.STRING,
    nacionalidade: db.Sequelize.STRING,
    profileimage: db.Sequelize.STRING,
    birthday: db.Sequelize.STRING
});


module.exports = usuarios;