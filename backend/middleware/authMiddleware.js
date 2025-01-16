const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    // return res
    // .status(401)
    // .json({ message: "Access Denied: No Token Provided" });
    console.log("Token non fourni pour la route :", req.path); // Debug
    return next(); // Passe la vérification pour toutes les routes
  }
  const publicRoutes = ["/api/auth/login", "/api/auth/register", "/api/home"];

  if (publicRoutes.includes(req.path)) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
