import express from "express";
import { verifyToken } from "../utils/auth";
import * as WarehouseItems from "../controllers/warehouseItems";

const router = express.Router();

router.get("/getItem", verifyToken, WarehouseItems.getItem);
router.patch("/updateItem", verifyToken, WarehouseItems.updateItem);

export default router;