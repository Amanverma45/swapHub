const userModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saveUser =async (req,res)=>{
    try{
        let { name, email, password } = req.body;
        email = email.trim().toLowerCase();
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
       const { password } = req.body;
       const email = req.body.email?.trim().toLowerCase();

        const user =await userModel.findOne({email})
        if(!user){
         return res.status(404).json({
          message:'User not found'
        })
      }
      const comparePassword = await bcrypt.compare(password,user.password)
      if(!comparePassword){
        return res.status(400).json({message:'Incorrect password'})
      }
      const token = jwt.sign({id:user._id, email:user.email},process.env.JWT_SECRET,{expiresIn: "1d"});
       res.status(200).json({message: "Login Successfully",token,user});
    }catch(error){
       console.log("ERROR:", error)
     return res.status(500).json({
        error: error.message,
        fullError: error
    })
}
}

const updateProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        if (req.body.name) {
            user.name = req.body.name;
        }

        if (req.file) {
            user.profileImage = req.file.path;
        }
        await user.save();

        const updatedUser = await userModel.findById(req.user.id).select("-password");
        return res.status(200).json({message: "Profile updated successfully",user: updatedUser});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const getProfile = async (req, res) => {
    try {
       const profile = await userModel.findById(req.user.id).select("-password");
       if(!profile){
        return res.status(404).json({message:"Profile not found"})
       }
       return res.status(200).json(profile)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
module.exports ={saveUser,loginUser,updateProfile,getProfile}