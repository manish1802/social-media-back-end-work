import express from "express";
import { getfollow, addfollow ,deletefollow} from "../controllers/relationship.js";

const followsrouter = express.Router()

followsrouter.get('/' , getfollow)
followsrouter.post('/' , addfollow)
followsrouter.delete('/' , deletefollow)

export default followsrouter;