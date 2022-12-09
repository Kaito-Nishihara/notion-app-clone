import memoController from "../controllers/memo";

const memoRouter = require("express").Router();
const tokenHandler = require("../handlers/tokenHandler");
const { param } = require("express-validator");
const validation = require("../handlers/validation");

memoRouter.post("/", tokenHandler.verifyToken, memoController.create);
memoRouter.get("/", tokenHandler.verifyToken, memoController.getAll);
memoRouter.put("/:memoId", tokenHandler.verifyToken, memoController.update);
memoRouter.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);
memoRouter.get(
  "/:memoId",
  // param("memoId").custom((value: any) => {
  //   if (!validation.isObjectId(value)) {
  //     return Promise.reject("無効なIDです。");
  //   } else return Promise.resolve();
  // }),
  //validation.validate,
  tokenHandler.verifyToken,
  memoController.getOne
);

export default memoRouter;
