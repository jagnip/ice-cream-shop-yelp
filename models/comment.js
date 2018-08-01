var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema( {
    text: String,
    author: String,
    description: String,
});

module.exports = mongoose.model("Comment", commentSchema);