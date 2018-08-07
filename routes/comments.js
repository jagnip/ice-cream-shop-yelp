var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Shop = require("../models/shop");

router.get("/new", isLoggedIn, (req, res) => {
    Shop.findById(req.params.id, (err, foundShop) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {shop: foundShop});
        }
    });
});

router.post("/", isLoggedIn, (req, res) => {
    
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
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;