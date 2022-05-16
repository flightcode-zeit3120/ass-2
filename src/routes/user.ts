import express from "express";
import { verifyToken } from "../utils/auth";
import * as User from "../controllers/user";

const router = express.Router();

router.post("/login", User.logIn);
router.post("/register", User.register);
router.get("/name", verifyToken, User.getName);

export default router;