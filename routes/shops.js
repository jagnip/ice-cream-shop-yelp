var express = require("express");
var router = express.Router();

var Shop = require("../models/shop");

router.get("/", (req, res) => {
    
    Shop.find({}, (err, shops) => {
        if(err) {
            console.log(err);
        } else {
            res.render("shops/index", {shops: shops});
        }
    });
});

router.get("/new", isLoggedIn, (req, res) => {
    res.render("shops/new");
});

router.post("/", isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.shopdescription;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newShop = {name: name, image: image, description: description, author: author};
    Shop.create(newShop, (err, shop) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/shops");
        }
    });
});

router.get("/:id", (req, res) => {
 
    Shop.findById(req.params.id).populate("comments").exec(function(err, foundShop) {
        if(err) {
            console.log(err);
        } else {
            res.render("shops/show", {shop: foundShop});
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