
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const V1Router = require("./src/routes/v1/routes.js")

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));
app.use(cors())
app.use("/v1",V1Router)

module.exports.handler = serverless(app)
