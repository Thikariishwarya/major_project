const express=require("express");
const router=express.Router();
const listing = require("../models/listing.js");
const wrapAsync=require("../utils/wrapasync.js");



router.get("/Trending",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Trending"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Rooms",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Rooms"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Iconic_Cities",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"IconicCities"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Mountains",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Mountains"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Castles",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Castles"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Amazing_Pools",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"AmazingPools"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Camping",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Camping"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Farms",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Farms"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Arctic",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Arctic"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Beaches",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Beaches"});
    res.render("listings/index.ejs",{allListings});
}));
router.get("/Boats",wrapAsync(async(req,res)=>{
    let allListings=await listing.find({category:"Boats"});
    res.render("listings/index.ejs",{allListings});
}));

module.exports=router;