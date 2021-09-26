var express = require("express");
var router = express.Router();
const appController = require("../controller/appController");

router.get("/advertisements", appController.getAdvertisement);

router.post("/advertisement/create", appController.createAdvertisement);

router.post("/advertisement/delete", appController.deleteAdvertisement);

module.exports = router;
