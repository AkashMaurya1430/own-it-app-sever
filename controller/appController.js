const { response } = require("express");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const Advertisement = require("../model/Advertisement");
const User = require("../model/User");

module.exports.createAdvertisement = async (req, res) => {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
  });
  const fileNamePrefix = Math.floor(new Date().getTime() / 1000);
  form
    .parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      image = "https://own-it-app-server.herokuapp.com/advImages/" + fileNamePrefix + files.photo.name;
      // image = "http://localhost:3000/advImages/" + fileNamePrefix + files.photo.name;
      console.log(fields);
      const add = new Advertisement({
        title: fields.title,
        description: fields.description,
        price: fields.price,
        category: fields.category,
        photo: image,
        createdBy: fields.userId,
      });
      add.save((err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        } else {
          console.log("saved");
          res.status(200).json({
            success: true,
            message: "Adv Created Successfully",
          });
        }
      });
    })
    .on("fileBegin", (name, file) => {
      if (file.name != "") {
        file.path = "./public/advImages/" + fileNamePrefix + file.name;
      }
    });
};

module.exports.deleteAdvertisement = (req, res) => {
  Advertisement.findOneAndDelete(
    { _id: req.body.advertisementId },
    function (err, result) {
      if (!err) {
        response = { success: true, message: "Advertisement deleted successfully" };
        // Delete Blog Image From Folder
        let imagename = result.photo.split("/");
        let imagepath = path.join(__dirname, "../public/advImages/") + imagename[imagename.length - 1];
        fs.unlink(imagepath, (err) => {
          if (err) {
            console.error(err);
            return;
          } else {
            console.log("File deleted");
          }
        });
        res.status(200).json(response);
      } else {
        response = { success: false, message: err.message };
        console.log(err);
        res.status(500).json(response);
      }
    },
    { useFindAndModify: true }
  );
};

module.exports.getAdvertisement = (req, res) => {
  Advertisement.find({})
    .then((responseData) => {
      let response = { success: true, data: responseData };
      res.status(201).json(response);
    })
    .catch((err) => {
      let response = { success: true, message: err.message };
      res.status(400).json(response);
    });
};
