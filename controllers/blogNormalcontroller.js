var blogs =require("../models/blog")
module.exports={
    renderCreatepage: function(req,res){
        res.render("createblog",{
            title:"create Blog"
        })
    },
    renderUpdatepage:function(req,res){
        var currentUser = req.user
        var usersBlogs = currentUser.blogs
        var blog  = usersBlogs.find(function (b){
            return b._id.toString() === req.params.blogId
        })

        res.render("updateblog",{
            title:"Update Blog",
            blog: blog,
            req: req.path
        })  
    },
    renderDashboard:function(req,res){
        username=req.session.userName
        var user =req.user

        res.render("dashboard",{
            title:"dashboard page",
            name: username,
            length:user.blogs.length,
            blog:user.blogs,
            dashboard:true
        })
    }

}