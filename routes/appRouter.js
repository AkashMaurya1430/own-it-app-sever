var express = require("express");
var router = express.Router();
const appController = require("../controller/appController");

router.get("/advertisements", appController.getAdvertisementIDs);

router.post("/advertisement/create", appController.createAdvertisement);

router.get("/advertisement", appController.getSingleAdvertisement);

router.post("/advertisement/delete", appController.deleteAdvertisement);

module.exports = router;
