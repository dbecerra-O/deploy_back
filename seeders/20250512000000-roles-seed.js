// seeders/20250512000000-roles-seed.js
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert('roles', [
    {
      name: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'moderator',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('roles', null, {});
};

export default { up, down };