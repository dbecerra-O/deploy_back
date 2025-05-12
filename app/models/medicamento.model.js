export default (sequelize, Sequelize) => {
    const Medicamento = sequelize.define("medicamento", {
        CodMedicamento: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcionMed: Sequelize.STRING,
        fechaFabricacion: Sequelize.DATE,
        fechaVencimiento: Sequelize.DATE,
        Presentacion: Sequelize.STRING,
        stock: Sequelize.INTEGER,
        precioVentaUni: Sequelize.DECIMAL(10, 2),
        precioVentaPres: Sequelize.DECIMAL(10, 2),
        CodTipoMed: Sequelize.INTEGER,
        Marca: Sequelize.STRING,
        CodEspec: Sequelize.INTEGER,
    });
    Medicamento.associate = (models) => {
        Medicamento.hasMany(models.detalleOrdenCompra, {
          foreignKey: "CodMedicamento",
          as: "detalles"
        });
    };

    return Medicamento;
};