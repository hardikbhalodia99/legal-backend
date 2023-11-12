
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");

const V1Router = require("./src/routes/v1/routes.js")
app.use("/v1",V1Router)

module.exports.handler = serverless(app)
