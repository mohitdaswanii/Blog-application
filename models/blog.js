var mongoose = require("mongoose")
var Schema = mongoose.Schema
blogschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true }
)
var blog = mongoose.model("blog", blogschema)
module.exports = blog