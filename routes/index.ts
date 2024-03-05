import express from "express"
import authRoutes from "./auth"
import ventasRoutes from "./ventas"
import clientesRoutes from "./clientes"

const router = express.Router()

router.use("/auth", authRoutes)
router.use("/ventas", ventasRoutes)
router.use("/clientes", clientesRoutes)


export default router