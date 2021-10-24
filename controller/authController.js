const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../model/User");

module.exports.register = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    let newUser = new User({
      name: req.body.name,
      contact: req.body.contact,
      password: hash,
    });

    newUser.save((err, result) => {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          res.json("User Already Exist's");
        } else {
          res.json(err);
        }
      } else {
        res.status(201).json("User Created Successfully");
      }
    });
  });
};

module.exports.login = async (req, res) => {
  console.log(req);
  await User.findOne({ contact: req.body.contact }, function (err, user) {
    if (!user) {
      res.status(201).send("User does not exist!");
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(201).send("User Logged In");
        // res.redirect("/login");
      } else {
        res.status(201).send("Incorrect Password");
      }
    }
  });
};
