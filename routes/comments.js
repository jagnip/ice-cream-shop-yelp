var express = require("express");
var router = express.Router({mergeParams: true});
var Comment = require("../models/comment");
var Shop = require("../models/shop");
var middleware = require("../middleware/index");

router.get("/new", middleware.isLoggedIn, (req, res) => {
    Shop.findById(req.params.id, (err, foundShop) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {shop: foundShop});
        }
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    
    Shop.findById(req.params.id, (err, foundShop) => {
        if (err) {
            console.log(err);
            res.redirect("/shops");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Ooops, something went wrong.");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundShop.comments.push(comment);
                    foundShop.save();
                    req.flash("success", "Successfully added comment.");
                    res.redirect(`/shops/${foundShop._id}`);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        res.render("comments/edit", {shop_id: req.params.id, comment: foundComment});
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment) => {
        res.redirect(`/shops/${req.params.id}`);
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err, foundComment) => {
         req.flash("success", "Comment deleted.");
         res.redirect(`/shops/${req.params.id}`);
    })
})

module.exports = router;