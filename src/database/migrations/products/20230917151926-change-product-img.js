"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("products", "img", "image");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("products", "image", "img");
  },
};
