import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const { user: User, role: Role } = db;

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "¡No se proporcionó un token!" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), authConfig.secret);
    req.userId = decoded.id;

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(401).json({ message: "¡No autorizado!" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "¡No autorizado!" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    const adminRole = roles.find((role) => role.name === "admin");

    if (adminRole) {
        next();
        return;
    }
    res.status(403).json({ message: "¡Se necesita un rol de admin!" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const isModerator = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId);
      const roles = await user.getRoles();
  
      const moderatorRole = roles.find((role) => role.name === "moderator");
  
      if (moderatorRole) {
          next();
          return;
      }
      res.status(403).json({ message: "¡Se necesita un rol de moderador!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

export const isModeratorOrAdmin = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.userId);
      const roles = await user.getRoles();
  
      const hasRole = roles.some((role) => ["admin", "moderator"].includes(role.name));
  
      if (hasRole) {
          next();
          return;
      }
      res.status(403).json({ message: "¡Se necesita un rol de moderador o admin!" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};