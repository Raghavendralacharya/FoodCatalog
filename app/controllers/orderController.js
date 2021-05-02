const db = require("../models");
const order = db.order;
const Food = db.food;
let common =require("../common")
let validation = common.validation;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const checkInventoryofItems = async (items) => {
  let length = items.length;
  let count = 0;

  for(item of items ){
      const food = await Food.findById(item.food_id);
      if(food.inventory_available < item.quantity){
          return false;
      } 
      //TODO total amt check
      count++;
      if(length <= count){
          return true;
      }
  }
}

const updateInventory = async (items) => {
  for(item of items ){
      await Food.findByIdAndUpdate(item.food_id, { $inc: { inventory_available: -Math.abs(item.quantity) } });
  }
}

exports.orderFood = async (req, res) => {
  try {
    let user = req.body.user;
    let items = req.body.items;
    let total_amt = req.body.total_amt;

    if(validation.isEmpty(user) || validation.isEmpty(items) || validation.isEmpty(total_amt)){
      res.status(400).send({
        status: "failure",
        message: "error in input data",
      });
      return;
    }

    let status = await checkInventoryofItems(items)
    if(!status){
      res.status(400).send({
        status: "failure",
        message: "inventary unavailable",
      });
      return;
    }

  
    const newOrder = await order.create(req.body);
    if(!newOrder){
      res.status(400).json({
          status: "failure",
          message: "Error while placing order, please try again later"
      });
      return;
    }
    //updaing inventory
    await updateInventory(items);

    res.status(200).json({
        status: "success",
        data: newOrder
    });
  
  } catch (error) {
    res.status(400).send({
      status: "failure",
      message: error,
    });
  }
};

