const express = require("express");
const toobusy = require("toobusy-js");
const { linesHandler } = require("./controller");

const linesRouter = express.Router();

linesRouter.use((_req, res, next) => {
  if (toobusy()) {
    res.status(503).send("Server is busy");
    return;
  }
  next();
});

linesRouter.get("/", linesHandler);

module.exports = linesRouter;
