const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listings = require("../models/listings");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");

// all listings route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const data = await Listings.find();
    res.render("listings.ejs", { sample_data: data, title: "HomeHopper" });
  })
);

// render new-listing route
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new_listing.ejs", { title: "Add your property" });
});

// adding new listing
router.post(
  "/",
  isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const new_list = new Listings(req.body);
    new_list.owner = req.user._id;
    await new_list.save();
    req.flash("success", "New Listing Added");
    res.redirect("/listings");
  })
);

// show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const info = await Listings.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    if (!info) {
      req.flash("error", "invalid request");
      return res.redirect("/listings");
    }

    res.render("info.ejs", { info, title: info.title });
  })
);

// render edit page route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const data = await Listings.findById(id);

    if (!data) {
      req.flash("error", "invalid request");
      return res.redirect("/listings");
    }

    res.render("edit.ejs", { edit_list: data, title: "edit info" });
  })
);

// edit route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listings.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  })
);

// delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listings.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
  })
);

module.exports = router;