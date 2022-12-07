import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
import { Request, Response } from "express";

const User = require("../models/user");

export async function register(req: Request, res: Response) {
  const password = req.body.password;
  try {
    //パスワード暗号化
    const key = process.env.SECRET_KEY as string;
    const tokenkry = process.env.TOKEN_KEY as string;
    req.body.password = CryptoJS.AES.encrypt(password, key);
    //新規作成
    console.log(req.body);
    const user = await User.create(req.body);
    const token = JWT.sign({ id: user._id }, tokenkry, { expiresIn: "24h" });
    return res
      .status(200)
      .json({ success: true, data: { token: token, user: user } });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const key = process.env.SECRET_KEY as string;
    const tokenkry = process.env.TOKEN_KEY as string;
    //DBからユーザーが存在するか
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        success: false,
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
      return res.status(401).json({
        success: false,
        error: {
          param: "password",
          message: "パスワード名が無効です",
        },
      });
    }
    //JWT発行
    const token = JWT.sign({ id: user._id }, tokenkry, { expiresIn: "24h" });
    return res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
}
