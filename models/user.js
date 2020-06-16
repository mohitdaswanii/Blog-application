var mongoose = require("mongoose")
var bcrypt = require("bcryptjs")
var Schema = mongoose.Schema
var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        // unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: "blog"
    }]
},
    { timestamps: true }
)
userSchema.statics.findByEmailAndPassword = function (email, password) {
    var userObj = null
    return new Promise(function (resolve, reject) {
        // console.log(user.email,email)
        user.findOne({ email: email }).then(function (u) {
            // console.log(u.password)
            if (!u) reject("Incorrect Credentials")
            userObj = u
            console.log(password)
            return bcrypt.compare(password, u.password)
        }).then(function (isMatched) {
            console.log(isMatched)
            if (!isMatched) reject("Incorrect credentials");
            resolve(userObj);
        }).catch(function (err) {
            reject(err)
        })
    })
}
userSchema.pre("save", function (next) {
    var user = this;
    if (user.isModified("password")) {
        bcrypt.hash(user.password, 10).then(function (hashedpassword) {
            user.password = hashedpassword
            next()
        }).catch(function (err) {
            next(err);
        });
    }
    else next()
})
  
var user= mongoose.model("user", userSchema);
module.exports = user