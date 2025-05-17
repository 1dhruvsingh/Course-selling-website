const {Router} = require("express");
const UserRouter = Router();
const {UserModel} =require("../db.js");
const {jwt,z,bcrypt} = require("../config.js");
const {UserMiddleware} = require("../middleware/user.js")
require("dotenv").config();

UserRouter.post("/signup", async function (req,res){
     try{
    const requiredbody = z.object ({
        email : z.string().min(3).max(40).email(),
        password: z.string().min(8,"Password must be at least 8 characters").max(40, "Password can't exceed 40 characters").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,"Password must contain at least one letter and one number and one special character"),
        Firstname: z.string().min(3).max(40),
        Lastname: z.string().min(3).max(40)
    })

    const parsedData = requiredbody.safeParse(req.body);

    if(!parsedData.success){
        res.json({
            message: "Invalid format ",
            error: parsedData.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname
   
    const hashedpassword = await bcrypt.hash(password, 5);
    await UserModel.create({
        Email : email,
        Password: hashedpassword,
        FirstName: Firstname,
        LastName: Lastname
    })
    res.json({
        message:"user created"
    })
    }catch(e){
        console.log(e);
        res.json({
            message: "Some error occured ",
            error: e.message
        })
    }
});

UserRouter.post("/signin", async function(req,res){
   try{
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await UserModel.findOne({
         Email : email
    });

    if(!user){
        res.json({
            message:"This user doesn't exist"
        })
    }
    
    const match = await bcrypt.compare(password, user.Password);
    if(match){
        const token = jwt.sign({id: user._id}, process.env.JWT_USER_SECRET);
        console.log(jwt);
        res.json({
            token: token
        })
    }else {
        res.status(403).json({
            message: "error in generating token"
        })
    }
   } catch(e){
      res.status(401).json({
        message: "Unauthorized",
        error: e.message
      })
   }
});

UserRouter.get("/purchases",UserMiddleware,  async function(req,res){
    res.json({
        message: "upload"
    })
});

module.exports={
    UserRouter: UserRouter
}