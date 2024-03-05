import "dotenv/config"
import express from "express"
import router from "./routes"
import connetDB from "./db/connect"
import cors from "cors"
import cookierParser from "cookie-parser"

const app = express()

connetDB()
app.use(cookierParser())
app.use(express.json())
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use("/api", router)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log("App en el puerto: ", PORT)
})