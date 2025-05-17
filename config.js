const JWT_USER_SECRET = process.env.JWT_USER_SECRET;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const MONGO_URL = process.env.MONGO_URL;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");

module.exports = {
    JWT_USER_SECRET,
    JWT_ADMIN_SECRET,
    MONGO_URL,
    jwt,
    z,
    bcrypt
}