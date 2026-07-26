import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],

    store: {
        type: mongoose.Types.ObjectId,
        ref: "Store",
        required: true
    },

    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },

    orderStatus: {
        type: String,
        enum: ["Pending", "Delivered", "Canceled", "Shipped", "Reached Laundry"],
        default: "Pending"
    },

    scheduledDate: {
        type: Date
    },

    scheduledSlot: {
        type: String,
        enum: ["Morning (8AM - 11AM)", "Afternoon (12PM - 3PM)", "Evening (4PM - 7PM)"]
    },
    
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },

    razorpayPaymentId: {
        type: String
    },
    
    status: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    

}, { timestamps: true })

export const Order = mongoose.model("Order", orderSchema)