const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const users = jwt.verify(token, process.env.JWT);
    req.user = users.user;
  } else {
    req.user = null;
  }
  next();
};
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const userRole = req.user.cap;
    console.log("User Role:", userRole);
    if (Array.isArray(allowedRoles)) {
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Không có quyền" });
      }
    } else {
      if (userRole !== allowedRoles) {
        return res.status(403).json({ message: "Không có quyền" });
      }
    }

    next();
  };
};


module.exports = { authentication, requireRole };
