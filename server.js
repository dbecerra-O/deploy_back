import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import medicamentoRoutes from "./app/routes/medicamento.routes.js";
import detalleOrdenCompraRoutes from "./app/routes/detalleOrdenCompra.routes.js";
import { Sequelize } from "sequelize";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Farmacia." });
});

app.use("/api/medicamentos", medicamentoRoutes);
app.use("/api/detalleOrdenCompra", detalleOrdenCompraRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);

const PORT = process.env.PORT || 3000;

// Función para ejecutar seeders manualmente
// Función para ejecutar seeders manualmente
async function runSeeders() {
    console.log("Ejecutando seeders...");
    try {
        // Importar y ejecutar seeders usando ES modules
        const rolesSeed = await import('./seeders/20250512000000-roles-seed.js');
        const usersSeed = await import('./seeders/20250512000001-users-seed.js');
        const medicamentosSeed = await import('./seeders/20250512000002-medicamentos-seed.js');

        // Ejecutar seeders
        await rolesSeed.up(db.sequelize.getQueryInterface(), Sequelize);
        await usersSeed.up(db.sequelize.getQueryInterface(), Sequelize);
        await medicamentosSeed.up(db.sequelize.getQueryInterface(), Sequelize);

        console.log("Seeders ejecutados correctamente");
    } catch (error) {
        console.error("Error ejecutando seeders:", error);
    }
}

// Sincronizar base de datos y luego ejecutar seeders
db.sequelize.sync({ force: true }).then(async () => {
    console.log("Base de datos sincronizada.");
    
    // Ejecutar seeders después de sincronizar
    await runSeeders();

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}.`);
    });
});