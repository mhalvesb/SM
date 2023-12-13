'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("usuarios", "birthday",{
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: "01/01/1900"
    })
    await queryInterface.sequelize.query('UPDATE usuarios SET birthday = "" WHERE birthday IS NULL')
  },

  


  async down (queryInterface, Sequelize) {
  
  }
};
