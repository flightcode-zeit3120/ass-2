import express from "express";
import { verifyToken } from "../utils/auth";
import * as WarehouseItems from "../controllers/warehouseItems";

const router = express.Router();

router.get("/getItem", verifyToken, WarehouseItems.getItem);
router.patch("/updateItem", verifyToken, WarehouseItems.updateItem);
router.post("/addItem", verifyToken, WarehouseItems.addItem);
router.post("/addRegisterItem", verifyToken, WarehouseItems.addItemToRegister);

export default router;