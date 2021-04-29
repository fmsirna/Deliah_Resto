
var jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {            
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);            
            req.user = decodeToken;          
            next();
          } catch (error) {
            res.status(401).json("Invalid token");
          }           
    ;
    } else {
        res.sendStatus(401).json("No token, permission denied" )
    }
};
  
const authenticateJWTAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
            if (decodeToken.admin == "T"){
                req.validatedUser = decodeToken;
                next();
            }
            else{
                res.status(401).json({ msg: "usuario no admin" });
            }            
          } catch (error) {
            res.status(401).json({ msg: "Invalid token" });
          }            
    ;
    } else {
        res.sendStatus(401).json({ msg: "No token, permission denied" })
    }
};


module.exports = {authenticateJWT,authenticateJWTAdmin}