import express from "express";
import { getLikes,deleteLikes ,addLikes} from "../controllers/likes.js";

const likesrouter = express.Router()

likesrouter.get('/' , getLikes)
likesrouter.post('/' , addLikes)
likesrouter.delete('/' , deleteLikes)

export default likesrouter;