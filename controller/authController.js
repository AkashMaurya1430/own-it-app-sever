const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../model/User");

module.exports.register = (req, res) => {
  let response = {
    success: false,
    message: "",
  };
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    let newUser = new User({
      name: req.body.name,
      contact: req.body.contact,
      password: hash,
    });

    newUser.save((err, result) => {
      if (err) {
        console.log(err);
        if (err.code == 11000) {
          response.success = false;
          response.message = "User Already Exist's";
          res.status(400).json(response);
        } else {
          response.success = false;
          response.message = "User Already Exist's";
          res.status(400).json(response);
        }
      } else {
        response.success = true;
        response.userId = user;
        response.message = "User Created Successfully";
        res.status(201).json(response);
      }
    });
  });
};

module.exports.login = async (req, res) => {
  let response = {
    success: false,
    message: "",
  };
  await User.findOne({ contact: req.body.contact }, function (err, user) {
    if (!user) {
      response.success = false;
      response.message = "User does not exist!";
      res.status(201).json(response);
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        response.success = true;
        response.message = "User Logged In";
        response.userId = user;
        res.status(201).json(response);
        // res.redirect("/login");
      } else {
        response.success = false;
        response.message = "Incorrect Password";
        res.status(201).json(response);
      }
    }
  });
};
