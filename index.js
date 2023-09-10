import serverless from "serverless-http";
import express, { urlencoded, json } from "express";
const app = express();

import router from "./src/routes/v1/routes.js";


app.use(urlencoded({ extended: false }));
app.use(json({ limit: '10mb' }));

app.use("/v1", router);

export const handler = serverless(app);