import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
    userId: {
        type: String,
        // ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        lowercase: true,
    },
    userPhoto: {
      type: String,
      required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now(),
    },
    category:{
        type: String,
        required: true,
    },
    description: String,
}, { timestamps: true });


export const Expense = mongoose.model("Expense", expenseSchema);