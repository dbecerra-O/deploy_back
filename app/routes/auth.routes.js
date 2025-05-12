import express from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../middlewares/verifySingUp.js";

const router = express.Router();

router.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);
router.post("/signin", signin);

export default router;