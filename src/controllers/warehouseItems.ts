import { warehouseItems, registeredItem } from "../models/warehouseItem";

// Gets name of currently logged-in user
export async function getItem(req, res) {
  const itemName = req.query.itemName;

  // Error checking
  const errors = [];

  // Check if value not inputted
  if (!itemName) {
    errors.push({ itemID: "required" });
  }

  // Output any errors
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  //warehouseItems.findOne({itemID: givenItemID}, "-_id")
  //.then((data) => res.json(data));

  registeredItem.findOne({ itemName: itemName }).then((data) => {
    if (!data) {
      return res.status(404).json({ errors: [{ itemType: "no such itemType in the item register" }] });
    }

    const itemType = data._id;

    warehouseItems.aggregate([
      {
        // Performs a simple match (similar to find)
        '$match': {
          'itemType': itemType
        }
      }, {
        // Performs a traditional LEFT JOIN SQL function on itemType to _id
        '$lookup': {
          'from': 'registereditems',
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
          'item', 'itemType', 'itemDetails'
        ]
      }
    ]).then((data) => res.json(data)); // data[0] is used as this pipeline will only ever return one result as itemID is unique
  });
}

export async function updateItem(req, res) {
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

  warehouseItems.updateOne({ itemID: givenItemID }, { $set: { itemLoc: newItemLoc } })
    .then((data) => res.json(data))
}

export async function addItem(req, res) {
  var { itemType, itemLoc } = req.body;

  // Error checking
  const errors = [];

  // Check if value not inputted
  if (!itemType) {
    errors.push({ itemType: "required" });
  }
  if (!itemLoc) {
    errors.push({ itemLoc: "required" });
  }

  // Output any errors
  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  // Try find the objectID for the type
  registeredItem.findOne({ itemName: itemType }).then((data) => {
    if (!data) {
      return res.status(404).json({ errors: [{ itemType: "no such itemType in the item register" }] });
    }

    itemType = data._id;

    const newWarehouseItem = new warehouseItems({
      itemType,
      itemLoc
    });
  
    newWarehouseItem
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "success",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          errors: err,
        });
      });
  });
}

export async function addItemToRegister(req, res){
  const{ itemName, itemNotes } = req.body;

    // Error checking
    const errors = [];

    // Check if value not inputted
    if (!itemName) {
      errors.push({ itemName: "required" });
    }
    if (!itemNotes) {
      errors.push({ itemNotes: "required" });
    }
  
    // Output any errors
    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

  const newRegisterItem = new registeredItem({
    itemName,
    itemNotes
  });

  newRegisterItem
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: "success",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        errors: err,
      });
    });
}