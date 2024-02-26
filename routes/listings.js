const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapasync.js");
const listing = require("../models/listing.js");
const {validateListing,isLoggedIn,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudconfig.js");
const upload = multer({ storage });



//index and create route
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("Listing[image]"),validateListing,wrapAsync(listingController.createListing));

//New route

router.get("/new",isLoggedIn,listingController.renderNewForm);



//show update and delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("Listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync (listingController.destroyListing));



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;