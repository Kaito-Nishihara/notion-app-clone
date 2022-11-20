import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
const User = require("../models/user");
import { Request, Response } from "express";
const key = process.env.SECRET_KEY as string;
const tokenkry = process.env.TOKEN_KEY as string;
export async function register(req: Request, res: Response) {
  const password = req.body.password;
  try {
    //パスワード暗号化

    req.body.password = CryptoJS.AES.encrypt(password, key);
    //新規作成
    const user = await User.create(req.body);

    const token = JWT.sign({ id: user._id }, tokenkry, { expiresIn: "24h" });
    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    //DBからユーザーが存在するか
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({
        error: {
          param: "username",
          message: "ユーザー名が無効です",
        },
      });
    }
    //パスワードがあっているかどうか
    const descryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      key
    ).toString(CryptoJS.enc.Utf8);
    if (descryptedPassword != password) {
      res.status(401).json({
        error: {
          param: "password",
          message: "パスワード名が無効です",
        },
      });
    }
    //JWT発行
    const token = JWT.sign({ id: user._id }, tokenkry, { expiresIn: "24h" });
    return res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
