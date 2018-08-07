var express = require("express");
var router = express.Router();
var Comment = require("../models/comment");
var Shop = require("../models/shop");

router.get("/shops/:id/comments/new", isLoggedIn, (req, res) => {
    Shop.findById(req.params.id, (err, foundShop) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {shop: foundShop});
        }
    });
});

router.post("/shops/:id/comments/", isLoggedIn, (req, res) => {
    
    //lookup shop using ID
    Shop.findById(req.params.id, (err, foundShop) => {
        if (err) {
            console.log(err);
            res.redirect("/shops");
        } else {
            Comment.create(req.body.comment, (err, createdComment) => {
                if (err) {
                    console.log(err);
                } else {
                    foundShop.comments.push(createdComment);
                    foundShop.save();
                    res.redirect(`/shops/${foundShop._id}`);
                }
            });
        }
    });
    //create new comment
    //connect new comment to shop
    //redirect shop show page
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;