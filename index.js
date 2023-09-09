const serverless = require("serverless-http");
const express = require("express");
const app = express();

const router = require("./src/routes/v1/routes");


app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

app.use("/v1", router);

module.exports.handler = serverless(app);