const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    const {token} = req.cookies;
    if(token){
        const users = jwt.verify(token, process.env.JWT);
        req.user = users.user; 
    }
    else{
        req.user = null;
    }
    next();
}

module.exports = {authentication};