const jwt = require("jsonwebtoken");
const jwt_Secret = "Iamlol";
 
 function auth (req, res){
    const email = req.body.email;
    const password = req.body.password;
    
 }

 module.exports = {
     auth : auth
 } 