'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./categories.json', 'utf-8'))
    let createData = data.map(item => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
      return item
    })
    await queryInterface.bulkInsert('Categories', createData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
