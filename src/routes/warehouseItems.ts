import express from "express";
import { verifyToken } from "../utils/auth";
import * as WarehouseItems from "../controllers/warehouseItems";

const router = express.Router();

router.get("/getItemByName", verifyToken, WarehouseItems.getItem);
router.get("/getItemByID", verifyToken, WarehouseItems.getItemByID);
router.patch("/updateItem", verifyToken, WarehouseItems.updateItem);
router.patch("/updateRegisterItem", verifyToken, WarehouseItems.updateRegisterItem);
router.post("/addItem", verifyToken, WarehouseItems.addItem);
router.post("/addRegisterItem", verifyToken, WarehouseItems.addItemToRegister);

export default router;