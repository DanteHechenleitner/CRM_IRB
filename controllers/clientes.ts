import { Request, Response } from "express"
import clientesModel from "../models/clientes"

class Clientes {
    static getAll = async (req: any, res: Response) => {
        try{


            const clientes = await clientesModel.find()
    
            res.status(200).json({ok:true, menssage: "Aceptado", data: clientes})
        }catch(error){
  
            res.status(500).json({ok: false, menssage: "Error server"})
        }

    }

    static create = async (req: any, res: Response) =>{
        console.log({body: req.body})
        const createCliente = await clientesModel.create(req.body)
        res.status(201).json({ok: true, data: createCliente})
    }


    static getById = async (req: any, res: Response) => {

        const {id} = req.params
        try{
            const clientes = await clientesModel.findById(id)
    
            res.status(200).json({ok:true, menssage: "Aceptado", data: clientes})
        }catch(error){
  
            res.status(500).json({ok: false, menssage: "Error server"})
        }

    }

    static update = async (req: any, res: Response) =>{
        const {id} = req.params
        const updateCliente = await clientesModel.findByIdAndUpdate(id, req.body)
        res.status(201).json({ok: true, data: updateCliente})
    }



}

export default Clientes