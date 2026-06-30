const swapModel = require('../model/swapModel.js')
const swapProduct = async (req, res) => {
    try {
        const swapItem = new swapModel({
            sender: req.user.id,
            receiver: req.body.receiver,
            requestedProduct: req.body.requestedProduct,
            offeredProduct: req.body.offeredProduct,
        });
        await swapItem.save();
        return res.status(201).json({message: "Swap request sent successfully",swapItem});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const getSwapRequest = async (req, res) => {
    try {
        const request = await swapModel.find({receiver: req.user.id});
        return res.status(200).json(request);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const acceptSwapRequest = async(req,res)=>{
    try{
        const request = await swapModel.findByIdAndUpdate(req.params.id,{status:"accepted"},{ new:true})
        if(!request){
            return res.status(404).json({message:"Request not found"})
        }
        return res.status(200).json({message: "Swap request accepted",request,});
    }catch(error){
     console.log(error.message)
     return res.status(500).json({message:"something went wrong "})
    }
}

const rejectSwapRequest = async(req,res)=>{
    try{
        const request = await swapModel.findByIdAndUpdate(req.params.id,{status:"rejected"},{ new:true})
        if(!request){
            return res.status(404).json({message:"Request not found"})
        }
         return res.status(200).json({message: "Swap request rejected",request,});
    }catch(error){
     console.log(error.message)
     return res.status(500).json({message:"something went wrong "})
    }
}
module.exports = {swapProduct,getSwapRequest,acceptSwapRequest,rejectSwapRequest}