/*
    # index.js :  최상위 문서
    # mongoose를 통해 MongoDB와 연동한 후, 
    # POST /users API를 만들어 User모델을 이용해 새로운 객체를 생성한 후 저장
*/

// index.js
const express = require("express");
const mongoose = require("mongoose");
const api = require("./api");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/parkick", {
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api", api);   // 깔끔하게 api로 대체

app.listen(port, () => {
  console.log("Server is up on port " + port);
});