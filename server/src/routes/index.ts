import express from "express";
import rout from "./auth";
import memoRouter from "./memo";

const router = express.Router();
router.use("/auth", rout);
router.use("/memo", memoRouter);

export default router;
