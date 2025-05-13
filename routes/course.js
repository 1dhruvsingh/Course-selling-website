const {Router} = require('express')
const CourseRouter = Router();


CourseRouter.post("/purchase", function(req,res){
    
})

CourseRouter.get("/preview", function(req,res){
    res.json({
        message: "work harder kiddo"
    })
})

module.exports={
    CourseRouter: CourseRouter
}