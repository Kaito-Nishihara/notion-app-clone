import express from "express";
import mongoose from "mongoose";
export const app = express();
import router from "./routes/auth";
const PORT = 5002;
require("dotenv").config();
app.use(express.json());
app.use("/api", router);

//DB接続
async function main() {
  const url = process.env.URL as string;
  await mongoose.connect(url);
  console.log("DB connection established!");
}

main().catch((err) => {
  console.error(err);
});

app.listen(PORT, () => {
  console.log("Server Starting !! ");
});
