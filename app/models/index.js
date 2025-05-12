// models/index.js
import Sequelize from "sequelize";
import dbConfig from "../config/db.config.js";
import roleModel from "./role.model.js";
import userModel from "./user.model.js";
import detalleOrdenCompraModel from "./detalleOrdenCompra.model.js";
import medicamentoModel from "./medicamento.model.js";

// Imprime información para debugging
console.log("Configurando conexión a la base de datos:");
console.log("Host:", dbConfig.HOST);
console.log("Dialect:", dbConfig.dialect);
console.log("SSL:", dbConfig.dialectOptions?.ssl ? "Habilitado" : "No configurado");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  port: dbConfig.PORT,
  // IMPORTANTE: Agregar las opciones SSL aquí
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// El resto del código permanece igual
// 1. Definir modelos
db.user = userModel(sequelize, Sequelize);
db.role = roleModel(sequelize, Sequelize);
db.medicamento = medicamentoModel(sequelize, Sequelize);
db.detalleOrdenCompra = detalleOrdenCompraModel(sequelize, Sequelize);

// 2. Definir relaciones
db.role.belongsToMany(db.user, { through: "user_roles", foreignKey: "roleId" });
db.user.belongsToMany(db.role, { through: "user_roles", foreignKey: "userId", as: "roles" });

// Relación Medicamento -> DetalleOrdenCompra
db.medicamento.hasMany(db.detalleOrdenCompra, {
  foreignKey: "CodMedicamento",
  as: "detalles"
});

// Relación User -> DetalleOrdenCompra
db.user.hasMany(db.detalleOrdenCompra, {
  foreignKey: "UserId",
  as: "compras"
});

// Relaciones inversas (DetalleOrdenCompra -> Medicamento/User)
db.detalleOrdenCompra.belongsTo(db.medicamento, {
  foreignKey: "CodMedicamento",
  as: "medicamento"
});

db.detalleOrdenCompra.belongsTo(db.user, {
  foreignKey: "UserId",
  as: "user"
});

db.ROLES = ["user", "admin", "moderator"];
export default db;