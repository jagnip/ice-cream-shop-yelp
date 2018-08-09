var express = require("express");
var router = express.Router();

var Shop = require("../models/shop");
var middleware = require("../middleware/index");

router.get("/", (req, res) => {
    
    Shop.find({}, (err, shops) => {
        if(err) {
            console.log(err);
        } else {
            res.render("shops/index", {shops: shops});
        }
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("shops/new");
});

router.post("/", middleware.isLoggedIn, (req, res) => {
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

//EDIT SHOP ROUTE
router.get("/:id/edit", middleware.checkShopOwnership, (req, res) => {
    Shop.findById(req.params.id, (err, foundShop) => {
        res.render("shops/edit", {shop: foundShop});
    })
});

router.put("/:id", middleware.checkShopOwnership, (req, res) => {
    Shop.findByIdAndUpdate(req.params.id, req.body.shop, (err, foundShop) => {
        if(err) {
            res.redirect("/shops");
        } else {
            res.redirect(`/shops/${req.params.id}`);
        }
    });
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkShopOwnership, (req, res) => {
    Shop.findByIdAndRemove(req.params.id, (err) => {
        res.redirect("/shops");
    })
});

module.exports = router;