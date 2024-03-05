import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"

export const velidateUser = () => {

    return (req: any, res: Response , next: NextFunction)=>{
        
        try {
            console.log("RUTRA PROTEJIDA")
            const token = req.cookies.jwt
            const user = jwt.verify(token, process.env.JWT_SECRET as string)
            req.user = user
            next()
        } catch (error) {
            if(error instanceof JsonWebTokenError || error instanceof TokenExpiredError){
                console.log({name: error.name, message: error.message})
                return res.status(401).json({ok: false, menssage: "Token invalido" })
            }
            res.status(500).json({ok: false, menssage: "Error server"})
            
        }


    
    }

}