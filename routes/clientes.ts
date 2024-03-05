import express  from "express";
import Clientes from "../controllers/clientes";
import { velidateUser } from "../middlewares/auth";

const router = express.Router()

router.use(velidateUser())

router.get("/", Clientes.getAll),
router.get("/:id", Clientes.getById),
router.post("/", Clientes.create)
router.put("/:id", Clientes.update)

export default router