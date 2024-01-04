'use strict';
const fs = require('fs')
const { hashPass } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./user.json', 'utf-8'))
    let createData = data.map(item => {
      item.password = hashPass(item.password)
      item.createdAt = new Date()
      item.updatedAt = new Date()
      return item
    })
    await queryInterface.bulkInsert('Users', createData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
