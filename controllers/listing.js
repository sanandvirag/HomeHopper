const Listings = require("../models/listings");
const wrapAsync = require("../utils/wrapAsync.js");

const index = wrapAsync(async (req, res) => {
  const data = await Listings.find();
  res.render("listings.ejs", { sample_data: data, title: "HomeHopper" });
});

const renderNewListingForm = (req, res) => {
  res.render("new_listing.ejs", { title: "Add your property" });
}

const NewListingAddition =   wrapAsync(async (req, res) => {
  const new_list = new Listings(req.body);
  new_list.owner = req.user._id;
  await new_list.save();
  req.flash("success", "New Listing Added");
  res.redirect("/listings");
});

const showListing =   wrapAsync(async (req, res) => {
  const { id } = req.params;
  const info = await Listings.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

  if (!info) {
    req.flash("error", "invalid request");
    return res.redirect("/listings");
  }

  res.render("info.ejs", { info, title: info.title });
});

const renderEditPage =   wrapAsync(async (req, res) => {
  const { id } = req.params;
  const data = await Listings.findById(id);

  if (!data) {
    req.flash("error", "invalid request");
    return res.redirect("/listings");
  }

  res.render("edit.ejs", { edit_list: data, title: "edit info" });
});

const EditListing = wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listings.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
});

const deleteListing =  wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listings.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
})

module.exports = {index, renderNewListingForm, NewListingAddition, showListing, renderEditPage, EditListing, deleteListing};


