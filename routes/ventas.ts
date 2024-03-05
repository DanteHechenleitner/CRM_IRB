import express  from "express";
import Ventas from "../controllers/ventas";
import { velidateUser } from "../middlewares/auth";

const router = express.Router()

router.use(velidateUser())

router.get("/", Ventas.getAll)
router.post("/", Ventas.create)

export default router