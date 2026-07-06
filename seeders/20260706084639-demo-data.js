'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '9780132350884',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        isbn: '9780201616224',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('Members', [
      {
        name: 'Alice',
        email: 'alice@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Members', null, {});
  }
};