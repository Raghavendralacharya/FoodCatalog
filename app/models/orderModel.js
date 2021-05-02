const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user:{
        type: String,
        required: true
    },
    total_amt: {
        type: Number,
        required: [true, 'total amount is required']
    },
    orderDateTime: {
        type: Date,
        default: Date.now(),
        select: false // this is for always excluding this field from response 
    },
    items: [
        {
            food_id: {
                type: mongoose.Schema.ObjectId,
                ref: 'Food'
            },
            quantity: Number,
            _id : {id:false}
        }
    ]
})
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;