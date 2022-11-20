import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import express from "express";
import { login, register } from "../controllers/user";
import { validate } from "../handlers/validation";
const User = require("../models/user");
const router = express.Router();

//利用者新規登録API
router.post(
  "/register",
  body("username").isLength({ min: 8 }).withMessage("usernaem min 8 length"),
  body("password").isLength({ min: 8 }).withMessage("password min 8 length"),
  body("configrmPassword")
    .isLength({ min: 8 })
    .withMessage("configrmPassword min 8 length"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user: any) => {
      if (user) {
        return Promise.reject("invalid username");
      }
    });
  }),
  validate,
  register
);

router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("ユーザー名は8文字以上である必要があります"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("パスワードは8文字以上である必要があります"),
  validate,
  login
);

export default router;
