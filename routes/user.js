const {Router} = require("express")
const UserRouter = Router();

UserRouter.post("/signup", async function (req,res){
    const requiredbody = zod.object ({
        email : z.string().min(3).max(40).email(),
        password : z.string.min(6).max(40).regex("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"),
        name: z.string().min(3)
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
    const name = req.body.name;
    
    bcrypt.hash(password, 5, function (hash,err){

    })
    
})


UserRouter.post("/signin", function(req,res){
    
})

UserRouter.get("/purchases", function(req,res){
    
})

module.exports={
    UserRouter: UserRouter
}