import express from "express";
import { verifyToken } from "../utils/auth";
import * as WarehouseItems from "../controllers/warehouseItems";

const router = express.Router();

router.get("/getItemByName", verifyToken, WarehouseItems.getItem);
router.get("/getItemByID", verifyToken, WarehouseItems.getItemByID);
router.get("/getRegister", verifyToken, WarehouseItems.getRegister);
router.patch("/updateItem", verifyToken, WarehouseItems.updateItem);
router.patch("/updateRegisterItem", verifyToken, WarehouseItems.updateRegisterItem);
router.post("/addItem", verifyToken, WarehouseItems.addItem);
router.post("/addRegisterItem", verifyToken, WarehouseItems.addItemToRegister);
router.delete("/deleteItem", verifyToken, WarehouseItems.deleteItem);
router.delete("/deleteRegisterItem", verifyToken, WarehouseItems.deleteRegisterItem);

export default router;