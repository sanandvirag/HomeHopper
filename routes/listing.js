const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");


// all listings route
router.get(
  "/",
  listingController.index
);

// render new-listing route
router.get("/new",
  isLoggedIn, 
  listingController.renderNewListingForm
);

// adding new listing
router.post(
  "/",
  isLoggedIn,
  validateListing,
  listingController.NewListingAddition
);

// show route
router.get(
  "/:id",
  listingController.showListing
);

// render edit page route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  listingController.renderEditPage
);

// edit route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  listingController.EditListing
);

// delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  listingController.deleteListing
);

module.exports = router;