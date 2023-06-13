import express from "express";
import { posts,addpost, deletepost } from "../controllers/posts.js";

const postsrouter = express.Router()

postsrouter.get('/posts',posts)
postsrouter.post('/posts',addpost)
postsrouter.delete('/posts/:id',deletepost)


export default postsrouter;