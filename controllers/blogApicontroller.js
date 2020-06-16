var blogs = require("../models/blog")
module.exports = {
    createBlog: function (req, res) {
        var user = req.user
        var blog = new blogs({ ...req.body })
        user.blogs.push(blog._id)
        user.save().then(function () {
            console.log("USER has successfully addedd the new blog")
        }).catch(function (err) {
            console.log(err)
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            return res.status(500).send("Server Error");
        })
        blog.save().then(function (blogObj) {
            console.log("Saved successfully");
            return res.redirect("/dashboard");
        })
            .catch(function (err) {
                console.log(err.messsage);
                return res.status(500).redirect("/dashboard");
            })
    },
    updateBlog: function (req, res) {
        // var blogId = req.user.blog._id
        var newUpdatedObject = {...req.body}
        var blogId = req.params.blogId
        blogs.updateOne({ _id: blogId }, { $set: newUpdatedObject }, { new: true }).then(function (blog) {
            if (!blog) return res.status(404).send("Blog updated successfully")
            res.redirect("/dashboard")
        }).catch(function (err) {
            console.log(err.message)
            return res.status(500).redirect("/dashboard")
        })
    },
    deleteBlog: function (req, res) {
        var blogId = req.params.blogId
        blogs.deleteOne({ _id: blogId }).then(function (blog) {
            if (!blog) 
            return res.send("blog not found")
            
             res.redirect("/dashboard")
        })
    },
    homepage:function(req,res){
        blogs.find().then(function(blog){
            res.render("index",{
                title:"home page",
                blog:blog
            })
        })
    }
}