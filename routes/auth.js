import express from "express";
import { alluser, login, register } from "../controllers/auth.js";


const authrouter = express.Router()

authrouter.post('/register',register)
authrouter.post('/login',login)
// authrouter.post('/password',logout)
authrouter.get('/allusers',alluser)

export default authrouter;