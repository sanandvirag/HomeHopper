const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.get("/signup",(req,res)=>{
  res.render("signup.ejs",{title:"Sign Up"});
});

router.post("/signup", async(req , res, next)=>{
  try{
    let {username , email , password} = req.body;
    const newUser = new User({username , email});
    const registeredUser = await User.register(newUser , password);
    req.logIn(registeredUser , (err)=>{
      if(err){
        return next(err);
      }
      req.flash("success" , "signed up successfully");
      res.redirect("/listings");
    });
  }
  catch(e){
    req.flash("error" , e.message);
    res.redirect("/signup");
  }
});

router.get("/login" , (req , res)=>{
  res.render("login.ejs",{title:"Log In"});
});

router.post("/login" , saveRedirectUrl , passport.authenticate('local',{ failureRedirect: '/login' , failureFlash:true}) , async(req,res)=>{
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
});

router.get("/logout",(req , res , next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success" , "logged out successfully");
    res.redirect("/listings");
  });
});

module.exports = router;
