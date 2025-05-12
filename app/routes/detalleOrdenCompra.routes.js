import express from "express";
import {
    verifyToken,
    isModeratorOrAdmin
} from "../middlewares/authJwt.js";
import {
    createDetalle,
    getDetalles,
} from "../controllers/detalleOrdenCompra.controller.js";

const router = express.Router();

// Rutas para Detalle de Compra
router.post("/", [verifyToken], createDetalle); // Usuarios autenticados
router.get("/", [verifyToken, isModeratorOrAdmin], getDetalles); // Admin/moderador

export default router;