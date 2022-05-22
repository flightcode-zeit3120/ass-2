import { ObjectId } from "mongodb"

export type TWarehouseItem = {
    _id: string,
    itemID: number,
    itemType: ObjectId,
    itemLoc: string
}