const cors = require("cors");
const express = require("express");
const app = express();

const apiRouter = require("./routes/api.router.js");

app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") {
    console.error("Error in middleware:", err);
  }

  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid article ID" });
  } else {
    res.status(500).send({ msg: "Internal server error" });
  }
});

module.exports = app;
