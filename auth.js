const jwt = require("jsonwebtoken");
const { jwt_secret } = require("./config");
require("dotenv").config();
 
 function UserAuth (req, res){
    const token = req.header.authorization;
    
    const userDetails = jwt.verify(token, process.env.jwt_secret);
    if(userDetails){
        req.userId = userDetails.id;
        next();
    }else{
        res.staus(401)({
            message: "Unauthorized"
        })
    }
    console.log(userDetails.userId);
 }

 function AdminAuth (req, res){

 }

 module.exports = {
     UserAuth : UserAuth,
     AdminAuth : AdminAuth
 }