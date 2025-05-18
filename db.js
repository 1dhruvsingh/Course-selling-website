const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    Email: {type: String, unique: true},
    FirstName: String,
    LastName: String,
    Password: String
});

const AdminSchema = new Schema({
    Email: {type: String, unique: true},
    FirstName: String,
    LastName: String,
    Password: String
});

const CourseSchema = new Schema({
    Title: String,
    Description: String,
    Price: Number,
    ImgUrl: String,
    AdminId: ObjectId
});

const PurchaseSchema = new Schema({
    UserId: ObjectId,
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