import express from "express";
import authrouter from "./routes/auth.js";
import emailrouter from "./routes/email.js";
import bodyParser from "body-parser";
import cors from "cors";
import postsrouter from "./routes/posts.js";
import multer from "multer";
import commentsrouter from "./routes/comments.js";
import likesrouter from "./routes/likes.js";
import cookieParser from "cookie-parser";
import userrouter from "./routes/users.js";
import followsrouter from "./routes/relationship.js";
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
}); 
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/youtube2022/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});
app.use("/api/auth", authrouter);
app.use("/api/",userrouter)
app.use("/api/users", postsrouter);
app.use("/api/comments", commentsrouter);
app.use("/api/likes", likesrouter);
app.use("/api/email", emailrouter);
app.use("/api/relationships",followsrouter);

app.listen(8800, () => {
  console.log("Api working");
});
