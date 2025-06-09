const express = require("express");
const app = express();

const apiRouter = require("./routes/api.router.js");

app.use(express.json());
app.use("/api", apiRouter);
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.error(err);
    res.status(500).send({ msg: " bad behaviour" });
  }
});

app.use("/api", apiRouter);

module.exports = app;
