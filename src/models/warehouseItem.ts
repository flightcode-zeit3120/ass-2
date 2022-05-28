import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";
import { TWarehouseItem } from "../types/warehouseItems";
import { Tregistereditem } from "../types/itemregister";

const SWarehouseItem = new Schema<TWarehouseItem>({
    itemType: {type: ObjectId, required: true},
    itemLoc: {type: String, required: true}
},{
    versionKey: false
});

const SRegisteredItem = new Schema<Tregistereditem>({
    itemName: {type: String, required: true},
    itemNotes: {type: String, required: true}
});

export const warehouseItems = model<TWarehouseItem>('warehouseitems', SWarehouseItem);
export const registeredItem = model<Tregistereditem>('registereditems', SRegisteredItem);