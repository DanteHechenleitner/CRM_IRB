import nodemailer from "nodemailer"

let trasnporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth:{
        user: "dante_hechenleitner@live.com",
        pass: "dante37213864*"
    },
})

interface EmailParams{
    to: string,
    subject: string,
    html: string

}

const sednEmail = async ({to,subject,html}: EmailParams)=>{
    try{
        
        const result = await trasnporter.sendMail({
            from:`Company <dante_hechenleitner@live.com>`,
            to,
            subject,
            html
        })
        console.log({result})
        return{ok: true, message:"Mail enviado con exito"}
    }catch(error){
        console.log(error)
        return{
            ok: false,
            message: "No se pude enviar el email",
            err: error,
        }
    }
}

export default sednEmail