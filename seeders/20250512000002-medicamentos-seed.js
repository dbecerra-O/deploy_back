// seeders/20250512000002-medicamentos-seed.js
export const up = async (queryInterface, Sequelize) => {
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  
  const oneYearLater = new Date(now);
  oneYearLater.setFullYear(now.getFullYear() + 1);
  
  const twoYearsLater = new Date(now);
  twoYearsLater.setFullYear(now.getFullYear() + 2);

  await queryInterface.bulkInsert('medicamentos', [
    {
      descripcionMed: 'Paracetamol 500mg',
      fechaFabricacion: oneYearAgo,
      fechaVencimiento: oneYearLater,
      Presentacion: 'Tabletas',
      stock: 100,
      precioVentaUni: 0.5,
      precioVentaPres: 15.0,
      CodTipoMed: 1,
      Marca: 'Genérico',
      CodEspec: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descripcionMed: 'Ibuprofeno 400mg',
      fechaFabricacion: oneYearAgo,
      fechaVencimiento: oneYearLater,
      Presentacion: 'Tabletas',
      stock: 80,
      precioVentaUni: 0.7,
      precioVentaPres: 20.0,
      CodTipoMed: 1,
      Marca: 'Advil',
      CodEspec: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descripcionMed: 'Amoxicilina 500mg',
      fechaFabricacion: oneYearAgo,
      fechaVencimiento: twoYearsLater,
      Presentacion: 'Cápsulas',
      stock: 50,
      precioVentaUni: 1.2,
      precioVentaPres: 30.0,
      CodTipoMed: 2,
      Marca: 'Genérico',
      CodEspec: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descripcionMed: 'Loratadina 10mg',
      fechaFabricacion: oneYearAgo,
      fechaVencimiento: twoYearsLater,
      Presentacion: 'Tabletas',
      stock: 70,
      precioVentaUni: 0.8,
      precioVentaPres: 20.0,
      CodTipoMed: 3,
      Marca: 'Claritin',
      CodEspec: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      descripcionMed: 'Omeprazol 20mg',
      fechaFabricacion: oneYearAgo,
      fechaVencimiento: oneYearLater,
      Presentacion: 'Cápsulas',
      stock: 60,
      precioVentaUni: 0.9,
      precioVentaPres: 25.0,
      CodTipoMed: 4,
      Marca: 'Prilosec',
      CodEspec: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
};

export const down = async (queryInterface, Sequelize) => {
  // Cambia "medicamento" a "medicamentos" aquí también
  await queryInterface.bulkDelete('medicamentos', null, {});
};

export default { up, down };