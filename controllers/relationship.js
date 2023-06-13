import db from "../db.js";
import Jwt from "jsonwebtoken";
import moment from "moment";
export const getfollow = async (req, res) => {
  const q = "SELECT followerUserid FROM relationships WHERE followedUserid = ?";
  try {
    const [data] = await db.query(q, [req.query.followedUserid]);
    if (data) {
      return res.send(data.map((relationship) => relationship.followerUserid));
    }
  } catch (error) {
    return res.json(error);
  }
};

export const addfollow = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    try {
      const q = "INSERT INTO relationships (`followerUserid`,`followedUserid`) VALUE (?,?)";
      const value = [userInfo.id,req.body.userId];
      console.log(" add value" ,value)
      const [data] = await db.query(q, value);
      if (data) {
        return res.json("Following");
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};

export const deletefollow = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    const q = "DELETE FROM relationships WHERE `followerUserid` = ? AND `followedUserid` = ?";
    const value = [userInfo.id, req.query.userId];
    console.log(" Delete value" ,value)
    try {
      const [data] = await db.query(q, value);
      if (data) {
        return res.json("UnFollow");
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};
