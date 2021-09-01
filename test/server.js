const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/test", (req, res) => {
  console.log(req.body);
  if (req.body === "test") {
    rollbar.log("correct input");
    res.status(200).send("Correct input");
  } else {
    rollbar.error("incorrect input");
    res.status(200).send("incorrect input");
  }
});

let port = process.env.PORT || 2525;

app.listen(port, () => {
  console.log(`running on ${port}`);
});
