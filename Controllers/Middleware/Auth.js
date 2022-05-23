const jwt = require("jsonwebtoken"); 


module.exports = function(req,res,next){
    const token = req.header('x-auth-token');

    if(!token){
        return res.status(401).send("No token, access denied")
    }

    try{
        const decoded = jwt.verify(token, "MySecretToken");
        req.user = decoded.user;
        next();
    }catch(err){
        console.error(err.message)
        return res.status(401).send("No token, access denied")
    }
}