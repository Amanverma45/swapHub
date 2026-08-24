const jwt = require("jsonwebtoken");
const userModel = require("./model/userModel");

const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.email === "amanarandiya@gmail.com" || user.role === "admin") {
      req.user = user;
      return next();
    }

    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
