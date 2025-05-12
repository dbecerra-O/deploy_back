import db from "../models/index.js";

export const getAllMedicamentos = async (req, res) => {
  try {
    const medicamentos = await db.medicamento.findAll();
    res.status(200).json(medicamentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createMedicamento = async (req, res) => {
  try {
    const medicamento = await db.medicamento.create(req.body);
    res.status(201).json(medicamento);
  } catch (err) {
    res.status(500).json({ message: "Error al crear medicamento" });
  }
};