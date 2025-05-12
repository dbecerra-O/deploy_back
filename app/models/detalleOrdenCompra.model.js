export default (sequelize, Sequelize) => {
  const DetalleOrdenCompra = sequelize.define("detalleOrdenCompra", {
    descripcion: Sequelize.STRING,
    cantidad: Sequelize.INTEGER,
    precio: Sequelize.DECIMAL(10, 2),
    montouni: Sequelize.DECIMAL(10, 2),
  });

  // Relaciones
  DetalleOrdenCompra.associate = (models) => {
    DetalleOrdenCompra.belongsTo(models.medicamento, {
      foreignKey: "CodMedicamento",
      as: "medicamento"
    });
    DetalleOrdenCompra.belongsTo(models.user, {
      foreignKey: "UserId",
      as: "user"
    });
  };

  return DetalleOrdenCompra;
};