const {Router} = require("express");
const AdminRouter = Router();
const {AdminModel} = require("../db.js")
const {jwt, jwt_Secret} = require("../auth.js");

AdminRouter.post("/signup", async function (req,res){
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
    let error1 = false;
    try{
    const hashedpassword = await  bcrypt.hash(password, 5);
    await AdminModel.create({
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
      error1 = true;
    }

    if(!error1){
       res.json({
        message: "Admin sign up successful"
       })
    }
    }catch(e){
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        })
    }
})



AdminRouter.post("/signin", async function(req,res){
    try{
    const email = req.body.email;
    const password = req.body.password;
    
    const admin = await AdminModel.findOne({
         Email : email
    });

    if(!admin){
        res.json({
            message:"This user doesn't exist"
        })
    }
    
    const match = await bcrypt.compare(password, user.Password);
    if(match){
        const token = jwt.sign({id: admin._id}, jwt_Secret);
        res.json({
            token: token
        })
    }else {
        res.status(403).json({
            message: "Uunauthorized"
        })
    }
    }catch(e){
        res.status(401).json({
            message: "Unauthorized",
            error: error.message
        })
    }
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
