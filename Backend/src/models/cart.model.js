import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [{

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
            max: 10
        }
    }],

    store: {
        type: mongoose.Types.ObjectId,
        ref: "Store"
    },

    scheduledDate: {
        type: Date,
        default: null
    },
 
    scheduledSlot: {
        type: String,
        enum: ["Morning (8AM - 11AM)", "Afternoon (12PM - 3PM)", "Evening (4PM - 7PM)"],
        default: null
    }
},
    {
        timestamps: true
    });

export const Cart = mongoose.model("Cart", cartSchema);