require("dotenv").config();
const {jwt} =require("../config.js");
 
function AdminMiddleware(req, res, next){
    const token = req.headers.token;
        console.log(token);
        const adminDetails = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
        if(adminDetails){
            req.adminId = adminDetails.id;
            next();
        }else{
            res.staus(401)({
                message: "Unauthorized"
            })
        }
        console.log(adminDetails.adminId);
}

module.exports = {
    AdminMiddleware: AdminMiddleware 
}