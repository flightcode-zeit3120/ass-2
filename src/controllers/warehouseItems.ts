import { warehouseItems } from "../models/warehouseItem";

// Gets name of currently logged-in user
export async function getItem(req, res) {
    const givenItemID = req.query.itemID;

    // Error checking
    const errors = [];

    // Check if value not inputted
    if (!givenItemID) {
        errors.push({ itemID: "required" });
    }

    // Output any errors
    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }

    //warehouseItems.findOne({itemID: givenItemID}, "-_id")
    //.then((data) => res.json(data));

    warehouseItems.aggregate([
        {
            // Performs a simple match (similar to find)
          '$match': {
            'itemID': +givenItemID // Type conversion of givenItemID as String to Int for match
          }
        }, {
            // Performs a traditional LEFT JOIN SQL function on itemType to _id
          '$lookup': {
            'from': 'itemregister', 
            'localField': 'itemType', 
            'foreignField': '_id', 
            'as': 'itemDetails'
          }
        }, {
            // Unwinds the returned arrray under itemDetails to just the single object
          '$unwind': {
            'path': '$itemDetails'
          }
        }, {
            // Removes the fields from the return output
          '$unset': [
            '_id', 'itemType', 'itemDetails._id'
          ]
        }
      ]).then((data) => res.json(data[0])); // data[0] is used as this pipeline will only ever return one result as itemID is unique
}

export async function updateItem(req, res){
    const givenItemID = req.query.itemID;
    const newItemLoc = req.query.newItemLoc;

    // Error checking
    const errors = [];

    // Check if value not inputted
    if (!givenItemID) {
        errors.push({ itemID: "required" });
    }

    if (!newItemLoc) {
        errors.push({ newItemLoc: "required" });
    }
    
    // Output any errors
    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }

    warehouseItems.updateOne({itemID: givenItemID}, {$set:{itemLoc: newItemLoc}})
    .then((data) => res.json(data))
}