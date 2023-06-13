import db from "../db.js";
import Jwt from "jsonwebtoken";
import moment from "moment";
export const getLikes = async (req, res) => {
  const q = "SELECT userid FROM likes WHERE postid = ?";
  try {
    const [data] = await db.query(q, [req.query.postid]);
    if (data) {
      return res.send(data.map((like) => like.userid));
    }
  } catch (error) {
    return res.json(error);
  }
};

export const addLikes = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    try {
      const q = "INSERT INTO likes (`userid`,`postid`) VALUE (?)";
      const value = [userInfo.id, req.body.postid];
      const [data] = await db.query(q, [value]);
      if (data) {
        return res.json("post  has been liked");
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};

export const deleteLikes = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    const q = "DELETE FROM likes WHERE `userid` = ? AND `postid` = ?";
    const value = [userInfo.id, req.query.postid];
    try {
      const [data] = await db.query(q, value);
      if (data) {
        return res.json("post  has been disliked");
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};
