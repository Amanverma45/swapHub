const userModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saveUser =async (req,res)=>{
    try{
        const {name,email,password}= req.body
        const existingUser = await userModel.findOne({ email });

         if (existingUser) {
          return res.status(400).json({message: "Email already exists",});
}
        const hashpassword = await bcrypt.hash(password,10)

        const user = new userModel({
            name,
            email,
            password:hashpassword
        })
        await user.save()

        res.status(201).json({message:'User Created Successfully'})
    } catch(error){
       console.log("ERROR:", error)
     return res.status(500).json({
        error: error.message,
        fullError: error
    })
}
}
const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user =await userModel.findOne({email})
        if(!user){
         return res.status(404).json({
          message:'User not found'
        })
      }
      const comparePassword = await bcrypt.compare(password,user.password)
      if(!comparePassword){
        return res.status(401).json({message:'Incorrect password'})
      }
      const token = jwt.sign({id:user._id, email:user.email},process.env.JWT_SECRET,{expiresIn: "30m"});
       res.status(200).json({message: "Login Successfully",token,user});
    }catch(error){
       console.log("ERROR:", error)
     return res.status(500).json({
        error: error.message,
        fullError: error
    })
}
}
module.exports ={saveUser,loginUser}