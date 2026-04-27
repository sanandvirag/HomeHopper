const mongoose = require("mongoose");
const Review = require("./reviews");

const ListingSchema = new mongoose.Schema({
  title:{
    type:String,
  },
  description:{
    type:String
  },
  image: {
    filename: {
      type: String,
    },
    url: {
      type: String,
    }
  },
  price:{
    type:Number,
  },
  location:{
    type:String,
  },
  country:{
    type:String,
  },
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Review'
    }
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  geometry:{
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

ListingSchema.post('findOneAndDelete', async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in:listing.reviews}});
  }
});

const Listings = mongoose.model("Listing" , ListingSchema);
module.exports = Listings;

