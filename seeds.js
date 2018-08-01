var mongoose = require("mongoose");
var Shop = require("./models/shop");
var Comment = require("./models/comment");

var data = [
    {name: "GoodLood", image: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c6ebc9230a17e1ab15f5b8565e8f4c2e&auto=format&fit=crop&w=500&q=60",
    description: "Bla bla bla"},
    {name: "Lodowe Kotki", image: "https://images.unsplash.com/photo-1508691643859-ca8898146a51?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ae64726e1809cfb9d648f63a1401b017&auto=format&fit=crop&w=1050&q=80",
    description: "Bla bla bla"},
    {name: "Emil kręci lody", image: "https://images.unsplash.com/photo-1447195047884-0f014b0d9288?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=50da6616a2bfc6b5c5208c291c28ce16&auto=format&fit=crop&w=1000&q=80",
    description: "Bla bla bla"}
    ];

function seedDB() {
    //Remove all shops
    Shop.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach((seed) => {
            Shop.create(seed, (err, shop) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a shop");
                    //create a comment
                    
                    Comment.create({
                        text: "This place is great! I love ice-cream!",
                        author: "Salem"
                    }, (err, comment) => {
                        if (err) {
                            console.log(err);
                        } else {
                            shop.comments.push(comment);
                            shop.save();
                            console.log("Created a new comment")
                        }
                    });
                }
            });
        });
    });
    
    //add a few shops
    
}

module.exports = seedDB;