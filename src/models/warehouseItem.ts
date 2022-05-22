import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { TWarehouseItem } from "../types/warehouseItems";

const SWarehouseItem = new Schema<TWarehouseItem>({
    itemID: {type: Number, required: true},
    itemType: {type: ObjectId, required: true},
    itemLoc: {type: String, required: true}
});

export const warehouseItems = model<TWarehouseItem>('warehouseItems', SWarehouseItem);