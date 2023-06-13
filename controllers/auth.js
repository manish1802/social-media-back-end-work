import db from "../db.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
export const register = async (req, res) => {
  //CHECK  USERS IF EXIST
  try {
    const q = "SELECT * FROM users WHERE username = ?";
    const [data] = await db.query(q, [req.body.username]);
    if (data.length) {
      return res.json("User already exist");
    }
  } catch (error) {
    if (error) return res.json(error);
  }
  //CREATE  USERS
  const q =
    "INSERT INTO users (`username`,`email`, `password`,`name`) VALUES (?,?,?,?)";
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const [data] = await db.query(q, [
      req.body.username,
      req.body.email,
      hashPassword,
      req.body.name,
    ]);
    if (data) {
      return res.json("register successfully");
    }
  } catch (error) {
    if (error) return res.json(error);
  }
};

export const login = async (req, res) => {
  //CHECK  USERS IF EXIST

  try {
    const q = "SELECT * FROM users WHERE username = ? ";
    const [data] = await db.query(q, [req.body.username]);
    if (data.length === 0) return res.json("User not Found");
    const isPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPassword) return res.status(400).json("Wrong User and Password");
    const token = Jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];
    return res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (error) {
    if (error) return res.json(error);
  }
};

export const alluser = async (req, res) => {
  //CHECK  USERS IF EXIST
try {
    const q = "SELECT * FROM users";
   const [data] = await db.query(q, [
      req.body.username,
      req.body.email,
      req.body.name,
    ]);
    if (data) {
      return res.json(data);
    }
  } catch (error) {
    if (error) return res.json(error);
  }
};
