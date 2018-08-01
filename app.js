var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Shop = require("./models/shop");
var seedDB = require("./seeds");

seedDB();

//APP CONFIG
mongoose.connect('mongodb://localhost:27017/ice_yelp', { useNewUrlParser: true }); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX
app.get("/shops", (req, res) => {
    
    Shop.find({}, (err, shops) => {
        if(err) {
            console.log(err);
        } else {
            res.render("shops/index", {shops: shops});
        }
    });
});

//NEW
app.get("/shops/new", (req, res) => {
    res.render("shops/new");
});

app.post("/shops", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.shopdescription;
    var newShop = {name: name, image: image, description: description};
    
    Shop.create(newShop, (err, shop) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/shops");
        }
    });
});

//SHOW 
app.get("/shops/:id", (req, res) => {
 
    Shop.findById(req.params.id).populate("comments").exec(function(err, foundShop) {
        if(err) {
            console.log(err);
        } else {
            res.render("shops/show", {shop: foundShop});
        }
    })
})

//COMMENTS ROUTES

app.get("/shops/:id/comments/new", (req, res) => {
    res.render("comments/new");
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server is listening!");
});