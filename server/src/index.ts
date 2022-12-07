import express from "express";
import mongoose from "mongoose";
export const app = express();
import router from "./routes";
const PORT = 5002;
require("dotenv").config();
const cros = require("cors");
app.use(
  cros({
    origin: "http://localhost:3000",
  })
);
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
