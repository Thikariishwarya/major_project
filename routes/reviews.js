const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapasync.js");
const listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js")

//reviews create route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));
 
//reviews delete route
 router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));


 module.exports=router;