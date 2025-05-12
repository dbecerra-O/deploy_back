import express from "express";
import {
    verifyToken,
    isAdmin,
    isModeratorOrAdmin
} from "../middlewares/authJwt.js";
import {
    getAllMedicamentos,
    createMedicamento
} from "../controllers/medicamento.controller.js";

const router = express.Router();

// Rutas para Medicamentos
router.get("/", [verifyToken], getAllMedicamentos); // Todos los usuarios autenticados
router.post("/", [verifyToken, isAdmin], createMedicamento); // Solo admin

export default router;