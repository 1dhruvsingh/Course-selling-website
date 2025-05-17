const {Router} = require("express");
const UserRouter = Router();
const {UserModel} =require("../db.js");
const bcrypt = require("bcrypt");
const z = require("zod");
const {jwt} = require("../auth.js");
require("dotenv").config();

UserRouter.post("/signup", async function (req,res){
     try{
    const requiredbody = z.object ({
        email : z.string().min(3).max(40).email(),
        password : z.string.min(6).max(40).regex("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"),
        Firstname: z.string().min(3),
        Lastname: z.string().min(3)
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
   
    const hashedpassword = await  bcrypt.hash(password, 5);
    await UserModel.create({
        Email : email,
        Password: hashedpassword,
        FirstName: Firstname,
        LastName: Lastname
    })
    }catch(e){
        res.json({
            message: "Some error occured ",
            error: error.message
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
        const token = jwt.sign({id: user._id}, process.env.jwt_secret);
        res.json({
            token: token
        })
    }else {
        res.status(403).json({
            message: "Uunauthorized"
        })
    }
   } catch(e){
      res.status(401).json({
        message: "Unauthorized",
        error: error.message
      })
   }
});

UserRouter.get("/purchases", async function(req,res){
    
})

module.exports={
    UserRouter: UserRouter
}