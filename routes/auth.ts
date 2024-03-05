import express  from "express";
import Auth from "../controllers/auth";

const router = express.Router()

router.post("/login/:email", Auth.login),
router.post("/login/:email/code", Auth.generateCode)

export default router