const listing=require("../models/listing.js")
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.index=async (req,res)=>{
    let allListings=await listing.find({});
    res.render("listings/index.ejs",{allListings});
        
}
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
     const Listing= await listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
     if(!Listing){
        req.flash("error","listing you requested for doesn't exist");
        res.redirect("/listings");
     }
     res.render("listings/show.ejs",{Listing});

};

module.exports.createListing=async(req,res)=>{
   let response=await geocodingClient.forwardGeocode({
        query: req.body.Listing.location,
        limit: 1
      })
        .send()
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing = new listing(req.body.Listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry;
    console.log(newListing);
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const Listing= await listing.findById(id);
    if(!Listing){
     req.flash("error","listing you requested for doesn't exist");
     res.redirect("/listings");
  }
   let originalImageUrl=Listing.image.url;
   originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{Listing,originalImageUrl});
 };

module.exports.updateListing=async(req,res)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.Listing.location,
        limit: 1
      })
        .send()
    let {id}=req.params;
    let List=await listing.findByIdAndUpdate(id,{...req.body.Listing});
    if(typeof req.file !=="undefined" && req.file){
        let url=req.file.path;
        let filename=req.file.filename;
        List.image={url,filename};
        await List.save();
    }
    List.geometry=response.body.features[0].geometry;
    if(List.geometry){
       await List.save(); 
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
 
 };

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deleted=await listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","Listing deleted!")
    res.redirect("/listings");
 };