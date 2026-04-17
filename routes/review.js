const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/reviews.js");
const { isLoggedIn, validateReview, isAuthor} = require("../middleware.js");


//review route
router.post("/", 
  isLoggedIn, 
  validateReview, 
  reviewController.createReview,
);

//delete review route
router.delete("/:reviewId", 
  isLoggedIn, 
  isAuthor, 
  reviewController.deleteReview,
);

module.exports = router;