const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const foodSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, 'Food name is mandatory']
    },
    inventory_available: {
        type: Number,
        required: [true, 'Quantity field cannot be null']
    },
    cost: {
        type: Number,
        required: [true, 'cost of food cannot be null']
    },
    cuisine: { 
        type: String,
        required: [true, 'cuisine is required']
    },
    food_type: String
});

foodSchema.plugin(mongoosePaginate);
const Food = mongoose.model("Food", foodSchema);

module.exports = Food;