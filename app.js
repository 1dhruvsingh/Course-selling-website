const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const {UserRouter} = require("./routes/user")
const {CourseRouter} = require("./routes/course")
const {AdminRouter} = require("./routes/admin")

const app = express();
app.use(express.json());

app.use("/user", UserRouter); 
app.use("/admin", AdminRouter);
app.use("/course",CourseRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000); 
}

main();