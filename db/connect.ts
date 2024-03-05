import mongoose from "mongoose"
import userModel from "../models/user"
import ventasModel from "../models/ventas"

async function connetDB(){
    if(!process.env.MONGODB_URL){
        throw new Error("Falta la variable de entorno de MONGODB_URL")
    }
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Servidor conectado a la DB")
        /*await ventasModel.create({operation_data: new Date, 
            user: "651065d333fd96935eae36eb",
            total_amaunt: 5000})*/
    }catch(error){
        console.log("No se pudo conectar a la DB")
    }
    
}

export default connetDB