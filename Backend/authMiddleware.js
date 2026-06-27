const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    try{
        console.log(req.headers)
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({message:'Token not found'})
        }
        const verifyToken = jwt.verify(
        token,process.env.JWT_SECRET
        )
        console.log("VERIFY:", verifyToken);      //remove
        console.log("TOKEN RECEIVED:", token);    //remove
console.log("JWT_SECRET:", process.env.JWT_SECRET);   //remove
        req.user = verifyToken
        next()
        console.log("TOKEN:", token);
console.log("JWT_SECRET:", process.env.JWT_SECRET)
        
    }catch(error){
        console.log(error.message)
         return res.status(401).json({message:'Invalid token'})
    }
}
module.exports = authMiddleware