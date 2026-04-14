const mongoose = require("mongoose");
const initData = require("./data");
const Listings = require("../models/listings");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/HomeHooper");
  console.log("database connection successful");
}

async function initDB() {
  await Listings.deleteMany({});

  const dataWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: "69dd1cf43b06fe303777bf80",
  }));

  await Listings.insertMany(dataWithOwner);
  console.log("DB initialized");
}

main()
  .then(initDB)
  .catch((err) => {
    console.log(err);
  });