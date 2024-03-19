if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const  ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js")


const listingsRouter=require("./routes/listings.js");
const reviewsRouter=require("./routes/reviews.js");
const usersRouter=require("./routes/Users.js");
const filtersRouter=require("./routes/filters.js");
const searchRouter=require("./routes/search.js");

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const dbUrl=process.env.ATLASDB_URL;
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
};
const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24 * 3600,
});

store.on("error",()=>{
    console.log("error on mongo",err);
});

const sessionOptions={
    store,
     secret:process.env.SECRET,
     resave:false,
     saveUninitialized:true,
     cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httponly:true
     },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",(req,res,next)=>{
    res.redirect("/listings");
})

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

//search router
app.use("/listings",searchRouter);

//filter router
app.use("/listings",filtersRouter);
//listing router
app.use("/listings",listingsRouter);

//reviews route
app.use("/listings/:id/reviews",reviewsRouter);

//user router
app.use("/",usersRouter);


app.all("*",(req,res,next)=>{

    next(new ExpressError(404,"page not found"));
});
app.use((err,req,res,next)=>{
    let {statuscode=500,message="something went wrong!"}=err;
    res.status(statuscode).render("error.ejs",{message});
});


app.listen(8080,()=>{
    console.log("server is listening at port 8080");
});

