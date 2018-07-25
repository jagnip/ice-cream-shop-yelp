var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

 var shops = [
        {name: "GoodLood", image: "https://pixabay.com/get/eb37b0062df3053ed1584d05fb1d4e97e07ee3d21cac104496f2c478afeab7be_340.jpg"},
        {name: "Algida", image: "https://pixabay.com/get/eb37b2062bf3063ed1584d05fb1d4e97e07ee3d21cac104496f2c478afeab7be_340.jpg"},
        {name: "Lody na Starowiślnej", image: "https://pixabay.com/get/e832b9092bf5003ed1584d05fb1d4e97e07ee3d21cac104496f2c478afeab7be_340.jpg"},
        ]

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/shops", (req, res) => {
    res.render("shops", {shops: shops});
});

app.get("/shops/new", (req, res) => {
    res.render("new");
})

app.post("/shops", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    
    shops.push({name: name, image: image});
    res.redirect("/shops");
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("Server is listening!");
});