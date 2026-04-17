const Review = require("../models/reviews");
const Listings = require("../models/listings");
const wrapAsync = require("../utils/wrapAsync.js");

const createReview = wrapAsync(async(req , res)=>{
  const {id} = req.params;
  const review = new Review(req.body.review);
  review.author = req.user._id;
  await review.save();
  await Listings.findByIdAndUpdate(id, {$push:{reviews:review}});
  req.flash("success" , "New Review Added");
  res.redirect(`/listings/${id}`);
});

const deleteReview = wrapAsync(async (req,res)=>{
  const {id , reviewId} = req.params;
  await Listings.findByIdAndUpdate(id, {$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success" , "Review Deleted");
  res.redirect(`/listings/${id}`);
});

module.exports = {createReview , deleteReview};
