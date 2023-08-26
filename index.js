const serverless = require("serverless-http");
const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

app.get("/",(req,res)=>{
  console.log("Hello world")
  return res.status(200).json({})
})

module.exports.handler = serverless(app);