import express from "express"
import { authcheck, loginUser, logout, registeruser } from "../controllers/usercontroller.js"
import {Addloan, getallloan, getbyemail} from "../controllers/loancontroller.js"


const router = express.Router()
//user api
router.post("/register",registeruser)
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/checkuser",authcheck)
//loan api
router.post("/addloan",Addloan)
router.get("/getAll",getallloan)
router.post("/getemail",getbyemail)
export default router