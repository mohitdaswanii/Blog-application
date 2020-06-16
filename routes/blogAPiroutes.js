var express=require("express")
var router=express.Router()
var authenticate=require("../middleware/authenticate")
var blogApicontroller=require("../controllers/blogApicontroller")
router.post("/blog/create",authenticate,blogApicontroller.createBlog)
router.put("/blog/update/:blogId",authenticate,blogApicontroller.updateBlog)
router.delete("/blog/delete/:blogId",authenticate,blogApicontroller.deleteBlog)
router.get("/",blogApicontroller.homepage)
module.exports=router