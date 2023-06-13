import db from "../db.js";
import Jwt from "jsonwebtoken";
import moment from "moment";
export const getComments = async (req, res) => {
  try {
    const q =
    `SELECT c.*,u.id AS userId, name, profilepic FROM comments AS c JOIN users AS u ON (u.id = c.userid) WHERE c.postid =? ORDER BY c.createdAt DESC `;
    const [data] = await db.query(q, [req.query.postId]);
    if (data) {
      return res.json(data);
    }
  } catch (error) {
    if (error) return res.json(error);
  }
};

export const addComments = async (req, res) => {
  const token = req.cookies.accessToken
 if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    const q = "INSERT INTO comments (`desc`,`createdAt`,`userid`, `postid`) VALUES (?,?,?,?)";
    const value = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ];
    console.log(value)
    try {
      const [data] = await db.query(q, value);
      if (data) {
        return res.json("Comments has been created");
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};