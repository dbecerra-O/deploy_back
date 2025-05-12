import db from "../models/index.js";

export const createDetalle = async (req, res) => {
  try {
    const detalleData = {
      ...req.body,
      UserId: req.userId,
      montouni: req.body.precio * req.body.cantidad
    };
    
    const detalle = await db.detalleOrdenCompra.create(detalleData);
    res.status(201).json(detalle);
  } catch (err) {
    res.status(500).json({ message: "Error al crear detalle" });
  }
};

export const getDetalles = async (req, res) => {
    try {
      const detalles = await db.detalleOrdenCompra.findAll();
      res.status(200).json(detalles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };