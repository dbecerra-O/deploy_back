// seeders/20250512000001-users-seed.js
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: bcrypt.hashSync('user123', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'moderator',
        email: 'moderator@example.com',
        password: bcrypt.hashSync('moderator123', 8),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    // Asignar roles a usuarios - primero buscar IDs de usuarios y roles
    const users = await queryInterface.sequelize.query(
      `SELECT id from users;`
    );
    const roles = await queryInterface.sequelize.query(
      `SELECT id from roles;`
    );
    
    const userRows = users[0];
    const roleRows = roles[0];
    
    await queryInterface.bulkInsert('user_roles', [
      {
        userId: userRows[0].id, // admin
        roleId: roleRows[1].id, // admin role
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: userRows[1].id, // user1
        roleId: roleRows[0].id, // user role
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: userRows[2].id, // moderator
        roleId: roleRows[2].id, // moderator role
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};