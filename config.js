const jwt_secret = process.env.JWT_SECRET;
const MONGO_URL = process.env.MONGO_URL;

module.exports = {
    jwt_secret,
    MONGO_URL
}