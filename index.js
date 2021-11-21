const express = require('express');
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');
// body-parser 패키지 : POST에서 body값을 읽어오기 위한 패키지
const mongoose = require('mongoose');
dotenv.config();

const port = process.env.PORT || 80;

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => {console.log("Connected to MongoDB");})
  .catch((err) => {console.error(e);});