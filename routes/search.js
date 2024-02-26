const express=require("express");
const router=express.Router();
const listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapasync.js");

router.get("/search",wrapAsync(async(req,res)=>{
    const query=req.query.q;
    let allListings=await listing.find({country:query});
    if(!allListings.length){
        req.flash("error","Please search for another destination!")
        res.redirect("/listings");
    }
    else{
    res.render("listings/index.ejs",{allListings});
    }
}));

module.exports=router;