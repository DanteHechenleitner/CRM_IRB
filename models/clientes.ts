import mongoose, { Schema } from "mongoose";

const clienteSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    document_type: {type: String, required: true,},
    document_value: {type:String, require: true},
    ventas: { type: {
        count: Number,
        amount: Number},
    }
})

export default mongoose.model("Cliente", clienteSchema)