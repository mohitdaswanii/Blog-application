var users = require("../models/user")
var upload=require("../imageuploads/multer")
var cloudinary=require("../imageuploads/cloudinary")
var convertbuffer=require("../imageuploads/convertBuffer")
module.exports = {
    registerUser: function (req, res) {
        var user = new users({ ...req.body });
        console.log(req.session)
        user.save()
            .then(function (u) {
                req.session.userId = u._id;
                req.session.userName = u.name;
                res.redirect("/dashboard")
                console.log(req.session)
            }).catch(function (err) {
                console.log(err)
                if (err.name === "ValidationError")
                    return res.status(400).send("Validation Error")
                else return res.status(500).send("Server Error")
            })
    },
    loginUser: function (req, res) {
        var email = req.body.email
        var password = req.body.password
        if (!email || !password)
            return res.status(400).send("Incorrect Credentials")
        users.findByEmailAndPassword(email, password).then(function (u) {
            req.session.userId = u._id
            req.session.userName = u.name;
            res.redirect("/dashboard")
        }).catch(function (err) {
            console.log(err)
            if (err.name === "ValidationError")
                return res.status(400).send("Validation Error")
            else return res.status(500).send("Server Error")
        })
    },
    logoutUser: function (req, res) {
        req.session.destroy()
        return res.redirect("/login")
    }
}