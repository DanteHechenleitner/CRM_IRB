import { Request, Response } from "express"
import ventasModel from "../models/ventas"

class Ventas {
    static getAll = async (req: any, res: Response) => {
        try{


            const ventas = await ventasModel.find({user: req.user.sub})
    
            res.status(200).json({ok:true, menssage: "Aceptado", data: ventas})
        }catch(error){
  
            res.status(500).json({ok: false, menssage: "Error server"})
        }

    }

    static create = async (req: any, res: Response) =>{
        const{ operation_data, total_amount} = req.body
        const createVenta = await ventasModel.create({operation_data, total_amount, user: req.user.sub})
        res.status(201).json({ok: true, data: createVenta})
    }

}

export default Ventas