import { Request, Response } from "express"
import sednEmail from "../helpers/mailer"
import userModel from "../models/user"
import jwt from "jsonwebtoken"


class Auth {
    static login = async (req: Request, res: Response) => {
        const {email} = req.params
        const {code} = req.body
        console.log({email, code})
        const user = await userModel.findOne({email, login_code: code})
        if(!user){
            return res.status(400).json({ok:false,message: "Codigo Invalido"})
        }

        const token = jwt.sign({sub: user._id, firstname : user.firstname, 
            email: user.email, roles: user.roles}, process.env.JWT_SECRET as string)

        res.cookie("jwt",token)
        res.status(200).json({ok:true, menssage: "Aceptado"})
    }

    static generateCode = async (req: Request, res: Response) => {
        const{email} = req.params
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).json({ok:false,message: "Correo invalido"})
        }
        let randomcode = ""

        for (let index = 0; index <= 5; index++) {
            const numbers = Math.floor(Math.random()*10)
            randomcode += numbers   
        }

        user.login_code = randomcode
        await user.save()

        sednEmail({
        to: email, 
        subject:"Este es tu codigo " + randomcode, 
        html:"Codigo para ingresar: " + randomcode})
        res.send("CODE")
    }
}

export default Auth 