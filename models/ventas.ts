import mongoose, { Schema, Types } from "mongoose";

const ventaSchema = new Schema({
    operation_data: Date,
    total_amount: Number,
    user: {type: Types.ObjectId, ref: "User"}
})

export default mongoose.model("Venta", ventaSchema)