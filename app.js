const express = require("express");
// const bcrypt = require("bycrypt")
// const zod = require("zod")

const {UserRouter} = require("./routes/user")
const {CourseRouter} = require("./routes/course")
const {AdminRouer} = require("./routes/admin")

const app = express();

app.use("/user", UserRouter);
app.use("/admin", AdminRouer);
app.use("/course",CourseRouter);

app.listen(3000);