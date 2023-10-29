const jwt = require("jsonwebtoken")
const DecodingToken = (req , res , next)=>{
    const token = req.header("authToken");
    if(!token){
        return res.status(401).json({accessDenied : true})
    }
    try{
        let decoded = jwt.verify(token , process.env.JJ_J);
        req.user = decoded.user;
        next();
    }catch(e){
        res.status(401).json({accessDenied:true});
    }
}
module.exports = DecodingToken;