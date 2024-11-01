const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://starvariant:starvariant@namastenodejs.eforu.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
