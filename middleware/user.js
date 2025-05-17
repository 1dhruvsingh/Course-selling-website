require("dotenv").config();

function UserMiddleware(req, res, next){
    const token = req.header.authorization;
        
        const userDetails = jwt.verify(token, process.env.JWT_USER_SECRET);
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

module.exports = {
    UserMiddleware: UserMiddleware 
}