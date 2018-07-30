var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/ice_yelp', { useNewUrlParser: true }); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP
var shopSchema = new mongoose.Schema( {
    name: String,
    image: String,
    description: String,
});

var Shop = mongoose.model("Shop", shopSchema);

app.get("/", (req, res) => {
    res.render("landing");
});

//INDEX
app.get("/shops", (req, res) => {
    
    Shop.find({}, (err, shops) => {
        if(err) {
            console.log(err);
        } else {
            res.render("shops", {shops: shops});
        }
    });
});

//NEW
app.get("/shops/new", (req, res) => {
    res.render("new");
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
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY")
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server is listening!");
});