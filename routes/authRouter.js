var express = require("express");
var router = express.Router();
const authController = require("../controller/authController");

router.get("/", (req, res) => {
  res.send("Site Active");
});

router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
