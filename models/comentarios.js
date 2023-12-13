const Sequelize = require("sequelize");



const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    database: process.env.DATABASE
});



/*
const sequelize = new Sequelize("postagem", "root", "teteu778",{
    host: "localhost",
    dialect: "mysql"
});

*/

sequelize.query(`ALTER TABLE Comentarios ADD COLUMN profileimage VARCHAR(255)`)
  .then(() => {
    console.log('Nova coluna adicionada com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao adicionar a nova coluna:', error);
  });


sequelize.sync();



module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
