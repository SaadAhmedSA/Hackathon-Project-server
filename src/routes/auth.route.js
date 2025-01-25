import express from "express"
import { authcheck, loginUser, logout, registeruser } from "../controllers/usercontroller.js"


const router = express.Router()
//user api
router.post("/register",registeruser)
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/checkuser",authcheck)

export default router