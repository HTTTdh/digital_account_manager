const jwt = require("jsonwebtoken");

const activeToken = (user) => {
    const code = (Math.floor(Math.random() * 900000) + 100000).toString();
    const token = jwt.sign({user, code}, process.env.JWT, {expiresIn : "5m"})
    return {token, code};
}

module.exports = activeToken;