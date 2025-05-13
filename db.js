const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

require("dotenv").config();
let MONGO_URL = process.env.MONGO_DB_URL;
mongoose.connect("MONGO_URL")

const UserSchema = Schema({
    Email: {type: String, unique: true},
    FirstName: String,
    LastName: String,
    Password: String
});

const AdminSchema = Schema({
    Email: {type: String, unique: true},
    FirstName: String,
    LastName: String,
    Password: String
});

const CourseSchema = Schema({
    Title: String,
    Description: String,
    Price: number,
    ImgUrl: String,
    AdminId: ObjectId
});

const PurchaseSchema = Schema({
    UserId: ObjectId,
    AdminId: ObjectId,
    CourseId: ObjectId
})

const UserModel = mongoose.model("user", UserSchema);
const AdminModel = mongoose.model("admin", AdminSchema);
const CourseModel = mongoose.model("course", CourseSchema);
const PurchaseModel = mongoose.model("purchase", PurchaseSchema);

module.exports = {
   UserModel,
   AdminModel,
   CourseModel,
   PurchaseModel
    
}