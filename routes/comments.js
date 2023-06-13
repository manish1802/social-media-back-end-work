import express from "express";
import { getComments,addComments } from "../controllers/comments.js";

const commentsrouter = express.Router()

commentsrouter.get('/', getComments)
commentsrouter.post('/', addComments)

export default commentsrouter;