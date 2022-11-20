import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 5001;
const URL = "mongodb+srv://au2485:u8i9o0p-@cluster0.fq8bq1b.mongodb.net/?retryWrites=true&w=majority";
//DB接続
try {
    await mongoose.connect(URL);
}
catch (error) {
    console.log();
}
app.get("/", (req, res) => {
    res.send("Hello Express");
});
//利用者新規登録API
app.listen(PORT, () => {
    console.log("サーバー起動中");
});
