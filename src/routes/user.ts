import express from "express";
import { verifyToken } from "../utils/auth";
import * as User from "../controllers/user";

const router = express.Router();

router.post("/login", User.logIn);
router.post("/register", User.register);
router.get("/email", verifyToken, User.getEmail);
// Delete user should require higher privileges than user
router.delete("/deleteUser", verifyToken, User.deleteUser);

export default router;