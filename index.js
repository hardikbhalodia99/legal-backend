const serverless = require("serverless-http");
const express = require("express");
const app = express();

const router = require("./src/routes/v1/routes");


app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

app.get("/",(req,res)=>{
  console.log("Hello world")
  return res.status(200).json({})
})

app.use("/", router);

module.exports.handler = serverless(app);