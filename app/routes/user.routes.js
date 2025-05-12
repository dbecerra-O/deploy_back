import express from "express";

import {
    allAcess,
    userBoard,
    moderatorBoard,
    adminBoard
} from "../controllers/user.controller.js";

import {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
} from "../middlewares/authJwt.js";

const router = express.Router();

router.get("/all", [verifyToken], allAcess);
router.get("/user", [verifyToken], userBoard);
router.get("/mod", [verifyToken, isModerator], moderatorBoard);
router.get("/admin", [verifyToken, isAdmin], adminBoard);
router.get("/mod-or-admin", [verifyToken, isModeratorOrAdmin], adminBoard);

export default router;