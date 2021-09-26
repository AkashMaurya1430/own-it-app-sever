const mongoose = require("mongoose");

const initDatabase = () => {
  // options for connection uri string
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // connecting to db
  let dbURI = process.env.DB_URI;
  if (process.env.NODE_ENV === "production") {
    dbURI = process.env.DB_URI;
  }

  //console.log(dbURI);
  mongoose.connect(dbURI, options);

  //access connection object
  const connection = mongoose.connection;

  // Event listeners for connection objects
  connection.on("connected", () => {
    console.log("Connected to the database successfully");
  });

  connection.on("error", (err) => {
    console.log(err);
  });

  connection.on("disconnected", () => {
    console.log("Disconnected");
  });
};

module.exports = initDatabase;
