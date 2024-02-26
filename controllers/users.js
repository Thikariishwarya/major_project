const User=require("../models/user.js") 


module.exports.renderSignupForm=(req,res)=>{
    res.render("Users/signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{let{username,email,password}=req.body;
   const newUser=new User({email,username,});
    const registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
     if(err)
     {
         next(err);
     }
     req.flash("success","Welcome to Wanderlove!");
     res.redirect("/listings");
    });
    console.log(registeredUser);
 }
 catch(err){
     req.flash("error",err.message);
     res.redirect("/signup");
 }
 };

module.exports.renderLoginForm=(req,res)=>{
    res.render("Users/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to Wanderlove!");
    if(res.locals.redirectUrl)
    {
        redirecturl=res.locals.redirectUrl;
    }
    else{
        redirecturl="/listings";
    }
    res.redirect(redirecturl);
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    })
}