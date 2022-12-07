import memoController from "../controllers/memo";

const memoRouter = require("express").Router();
const tokenHandler = require("../handlers/tokenHandler");
const { param } = require("express-validator");
const validation = require("../handlers/validation");

//📝を作成
memoRouter.post("/", tokenHandler.verifyToken, memoController.create);
//📝を取得
memoRouter.get("/", tokenHandler.verifyToken, memoController.getAll);

// router.put("/", tokenHandler.verifyToken, memoController.updatePosition);

// router.get("/favorites", tokenHandler.verifyToken, memoController.getFavorites);

memoRouter.get(
  "/:memoId",
  param("memoId").custom((value: any) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("無効なIDです。");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  memoController.getOne
);

export default memoRouter;
