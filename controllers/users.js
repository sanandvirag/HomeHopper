const User = require("../models/user.js");


const signUpRender = (req,res)=>{
  res.render("signup.ejs",{title:"Sign Up"});
};

const logInRender = (req , res)=>{
  res.render("login.ejs",{title:"Log In"});
};

const signUpRequest = async(req , res, next)=>{
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
};

const logInRequest = async(req,res)=>{
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

const logOutRequest = (req , res , next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success" , "logged out successfully");
    res.redirect("/listings");
  });
}

module.exports = {signUpRender, logInRender, signUpRequest, logInRequest, logOutRequest}
