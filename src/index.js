const path = require("path");
const express = require("express");
const logger = require("morgan");
const methodOverride = require("method-override");
require("./db/redis").getClient();
const routes = require("./router/routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ Error: "Internal Server Error", Status: 500 });
});

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
