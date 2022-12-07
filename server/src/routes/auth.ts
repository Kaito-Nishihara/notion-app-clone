import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import express from "express";
import { login, register } from "../controllers/user";
import { validate } from "../handlers/validation";
import { verifyToken } from "../handlers/tokenHandler";
const User = require("../models/user");
const router = express.Router();

//利用者新規登録API
router.post(
  "/register",
  body("username").isLength({ min: 8 }).withMessage("username min 8 length"),
  body("password").isLength({ min: 8 }).withMessage("password min 8 length"),
  body("comfirmPassword")
    .isLength({ min: 8 })
    .withMessage("comfirmPassword min 8 length"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user: any) => {
      if (user) {
        return Promise.reject({ success: false, error: "invalid username" });
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

//JWT認証
router.post("/verify-token", verifyToken, (req:any, res) => {
  return res.status(200).json({ success: true, data: { user: req.user } });
});

export default router;
