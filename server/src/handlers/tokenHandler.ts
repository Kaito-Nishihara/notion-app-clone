import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";

const User = require("../models/user");

export async function verifyToken(req: any, res: any, next: any) {
  const tokenDeocode = tokenDecode(req) as JWT.JwtPayload;
  if (tokenDeocode) {
    //JWTと一致するユーザーを探す
    const user = await User.findById(tokenDeocode.id);
    if (!user) {
      return res.status(401).json("権限がありません");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("権限がありません");
  }
}

//JWT認証を検証するためのミドルウェア
const tokenDecode = (req: any) => {
  const key = process.env.SECRET_KEY as string;
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    try {
      const decodeToken = JWT.verify(bearer, key);
      return decodeToken;
    } catch {
      return false;
    }
  } else {
    return false;
  }
};
