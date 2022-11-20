import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import express from "express";
const User = require("../models/user");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

exports.register = async (req: any, res: any) => {
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
};

module.exports = mongoose.model("User", userSchema);
