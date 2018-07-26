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
    image: String
});

var Shop = mongoose.model("Shop", shopSchema);

// Shop.create( {
//     name: "GoodLood", 
//     image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=fd67cdbdb7f3199afc745d4cdb4d10b1&auto=format&fit=crop&w=500&q=60"},
//     (err, shop) => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log(shop);
//         }
//     });

//  var shops = [
//         {name: "GoodLood", image: "https://pixabay.com/get/eb37b0062df3053ed1584d05fb1d4e97e07ee3d21cac104496f2c478afeab7be_340.jpg"},
//         {name: "Algida", image: "https://pixabay.com/get/eb37b2062bf3063ed1584d05fb1d4e97e07ee3d21cac104496f2c478afeab7be_340.jpg"},
//         {name: "Lody na Starowiślnej", image: "https://pixabay.com/get/e832b9092bf5003ed1584d05fb1d4e97e07ee3d21cac104496f2c478afeab7be_340.jpg"},
//         ];

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/shops", (req, res) => {
    
    Shop.find({},(err, shops) => {
        if(err) {
            console.log(err);
        } else {
            res.render("shops", {shops: shops});
        }
    });
});

app.get("/shops/new", (req, res) => {
    res.render("new");
});

app.post("/shops", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    
    shops.push({name: name, image: image});
    res.redirect("/shops");
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server is listening!");
});