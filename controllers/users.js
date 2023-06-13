import db from "../db.js";
import Jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id = ?";
  try {
    const [data] = await db.query(q, [userId]);

    const { password, ...other } = data[0];
    if (data) {
      return res.json(other);
    }
  } catch (error) {
    if (error) return res.json(error);
  }
};

export const updateUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send({ message: "USER NOT LOGIN" });
  Jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).send({ message: "Token not Valid!" });
    const q =
      "UPDATE users SET `name`=?, `city`=?, `website`=?, `profilepic`=?, `coverpic`= ? WHERE id =?";
    const value = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.profilepic,
      req.body.coverpic,
       userInfo.id,
    ];
    try {
      const [data] = await db.query(q, value);
      if(data.affectedRows>0){
        return res.json("updated")
      }
      if (data) {
        return res.json("update successfully");
      }
    } catch (error) {
      if (error) return res.json(error);
    }
  });
};
