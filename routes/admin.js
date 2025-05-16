const {Router} = require("express");
const AdminRouter = Router();
const {AdminModel} = require("../db.js")
const {jwt, jwt_Secret} = require("../auth.js");

AdminRouter.post("/signup", async function (req,res){
    
})


AdminRouter.post("/signin", function(req,res){
    
})

AdminRouter.post("/course", function(req,res){
    
})

AdminRouter.put("/course", function(req, res){

})

AdminRouter.get("/course/bulk", function(req, res){
    
})

module.exports={
    AdminRouter: AdminRouter
}
