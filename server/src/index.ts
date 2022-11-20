import express from "express";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
const User = require("./models/user");

const app = express();
const PORT = 5001;
require("dotenv").config();
app.use(express.json());

//DB接続
async function main() {
  const url = process.env.URL as string;
  await mongoose.connect(url);
  console.log("DB connection established!");
}

main().catch((err) => {
  console.error(err);
});

//利用者新規登録API
app.post("/register", async (req, res) => {
  const password = req.body.password;
  try {
    //パスワード暗号化
    const key = process.env.SECRET_KEY as string;
    req.body.password = CryptoJS.AES.encrypt(password, key);
    //新規作成
    const user = await User.create(req.body);
    const tokenkry = process.env.TOKEN_KEY as string;
    const token = JWT.sign({ id: user._id }, tokenkry, { expiresIn: "24h" });
    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen(PORT, () => {
  console.log("Server Starting !! ");
});
