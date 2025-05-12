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

const corsOptions = {
    origin: "*", // Permite cualquier origen
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