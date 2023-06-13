import db from "../db.js";
import Jwt from "jsonwebtoken";
import moment from "moment";

export const posts = async (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    const q = userId !== "undefined"
      ? "SELECT p.*,u.id AS userId, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId =? ORDER BY p.createdAt DESC"
      : "SELECT p.*,u.id AS userId, name, profilepic FROM posts AS p JOIN users AS u ON (u.id = p.userId)LEFT JOIN relationships AS r ON (p.userId = r.followedUserid) WHERE r.followerUserid = ? OR p.userId =? ORDER BY p.createdAt DESC ";
    const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];
    try {
      const [data] = await db.query(q, values);
      if (data) {
        return res.json(data);
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};

export const addpost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    const q = "INSERT INTO posts (`des`,`img`,`createdAt`,`userid`) VALUE (?)";
    const value = [
      req.body.des,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
    ];
    try {
      const [data] = await db.query(q, [value]);
      if (data) {
        return res.json("post created");
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};
export const deletepost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    const q = "DELETE FROM posts WHERE `id`= ? AND `userid`= ? ";
    try {
      const [data] = await db.query(q, [req.params.id,userInfo.id]);
      if (data.affectedRows>0) return res.json("post created");
      return res.json('you can delete only your post')
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};
