var express=require("express")
var router=express.Router()
var upload=require("../imageuploads/multer")
var userApicontroller=require("../controllers/userApicontroller")
router.post("/register",upload.single("fileupload"),userApicontroller.registerUser)
router.post("/login",userApicontroller.loginUser)
router.get("/logout",userApicontroller.logoutUser)
module.exports=router