var mongooose=require("mongoose")
mongooose.connect(process.env.MONGODBuri.replace("<password>",process.env.mongodbpass),{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(function(){
    console.log("Database connected successfully")
}).catch(function(err){
    console.log(err.message)
}) 