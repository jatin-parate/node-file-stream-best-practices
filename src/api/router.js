const express = require("express");
const linesRouter = require("./lines/router");

const apiRouter = express.Router();

apiRouter.use("/lines", linesRouter);

module.exports = apiRouter;
