const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    try{
        console.log(req.headers)
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({message:'Token not found'})
        }
        const verifyToken = jwt.verify(
        token,"OUR_SECRET_KEY"
        )
        req.user = verifyToken
        next()
        
    }catch(error){
        console.log(error.message)
         return res.status(401).json({message:'Invalid token'})
    }
}
module.exports = authMiddleware