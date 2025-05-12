import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import medicamentoRoutes from "./app/routes/medicamento.routes.js";
import detalleOrdenCompraRoutes from "./app/routes/detalleOrdenCompra.routes.js";

const app = express();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Password establecida" : "Password no establecida");
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_SSL:", process.env.DB_SSL);

const corsOptions = {
    origin: "http://localhost:5173", // Origen del frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Para permitir cookies/tokens
};
  
app.use(cors(corsOptions));

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
db.sequelize.sync({ force: true }).then(() => {
    console.log("Database synced.");

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});