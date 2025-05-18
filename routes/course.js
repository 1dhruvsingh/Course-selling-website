const {Router} = require('express');
const CourseRouter = Router();
const {CourseModel,PurchaseModel} = require("../db.js")
const {UserMiddleware} = require("../middleware/user.js")

CourseRouter.post("/purchase",UserMiddleware, async function(req,res){
    const userId = req.userId;
    const {courseId} = req.body;

    //razorpay functionality should be added to make sure that a purchase has been made 

    await PurchaseModel.create({
        UserId: userId,
        CourseId: courseId
    })
    res.json({
        message: "course purchased"
    })
})

CourseRouter.get("/preview", async function(req,res){
    const courses = await CourseModel.find({});
    res.json({
        courses
    })
})

module.exports={
    CourseRouter: CourseRouter
}