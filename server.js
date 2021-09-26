require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
const initDb = require("./config/initDb");
var initRoute = require("./routes/index");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Initialize DB
initDb();

// Initialize Routes
initRoute(app);

const host = "0.0.0.0";
app.listen(process.env.PORT || 3000, host, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
