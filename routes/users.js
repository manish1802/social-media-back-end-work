import express from "express";
import { getUser, updateUser } from "../controllers/users.js";

const userrouter = express.Router()

userrouter.get('/users/find/:userId', getUser)
userrouter.put('/users', updateUser)

export default userrouter;