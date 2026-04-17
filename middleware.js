const Listings = require("./models/listings");
const ListingSchema = require("./schemas/listings_validation");
const reviewSchema = require("./schemas/review_validation");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  }
  next();
};

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listings.findById(id);

  if (!listing) {
    req.flash("error", "listing not found");
    return res.redirect("/listings");
  }

  if (!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "not authorized");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

const validateListing = (req, res, next) => {
  const { error } = ListingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body.review);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }
  next();
};

const isAuthor = async (req, res, next)=>{
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if(!review){
    req.flash("error", "review not found");
    return res.redirect("/listings");    
  }
  if(!res.locals.currUser || !review.author.equals(res.locals.currUser._id)){
    req.flash("error" , "you are not the owner");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports = { isLoggedIn, saveRedirectUrl, isOwner, validateListing, validateReview, isAuthor};