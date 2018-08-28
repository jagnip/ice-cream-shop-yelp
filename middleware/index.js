var Comment = require("../models/comment");
var Shop = require("../models/shop");

var middleware = {
    
    checkCommentOwnership: function(req, res, next) {
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
            });
        } else {
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        }
    },
    
    checkShopOwnership: function(req, res, next) {
        if(req.isAuthenticated()) {
            Shop.findById(req.params.id, function(err, foundShop) {
            if(err) {
                req.flash("error", "Shop non found.");
                res.redirect("back");
            } else {
                if(foundShop.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
            });
        } else {
            req.flash("error", "You need to be logged in to do that.");
            res.redirect("back");
        }
    },
    
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/login");
    }
};

module.exports = middleware;