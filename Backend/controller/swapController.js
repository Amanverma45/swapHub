const swapModel = require('../model/swapModel.js')
const swapProduct = async (req, res) => {
    try {
      const existingRequest = await swapModel.findOne({
      sender: req.user.id,
      requestedProduct: req.body.requestedProduct,
      offeredProduct: req.body.offeredProduct,
      status: { $in: ["pending", "accepted"] },
  });

    if (existingRequest) {
        return res.status(400).json({
            message: "Swap request already sent."
        });
    }
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
       const request = await swapModel.find({receiver: req.user.id}).sort({ createdAt: -1 })
          .populate("sender", "name email")
          .populate("requestedProduct","productName image category location")
          .populate("offeredProduct","productName image category location")
        return res.status(200).json(request);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const acceptSwapRequest = async (req, res) => {
    try {
        const request = await swapModel.findById(req.params.id);
        if (!request) {
            return res.status(404).json({message: "Request not found"});
        }

        //  Security Check
        if (request.receiver.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized"});
        }

        request.status = "accepted";
        await request.save();
        return res.status(200).json({ message: "Swap request accepted", request,});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Something went wrong"}); 
    }
};

const rejectSwapRequest = async(req,res)=>{
    try {
        const request = await swapModel.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        // Security Check
        if (request.receiver.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        request.status = "rejected";
        await request.save();

        return res.status(200).json({
            message: "Swap request rejected",
            request,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const mySwapRequests = async (req, res) => {
    try {
        const requests = await swapModel.find({
            sender: req.user.id
        }).sort({ createdAt: -1 })
        .populate("receiver", "name email")
        .populate("requestedProduct", "productName image")
        .populate("offeredProduct", "productName image");

        return res.status(200).json(requests);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
const notificationCount = async (req, res) => {
  try {

    const count = await swapModel.countDocuments({
      sender: req.user.id,
      status: { $in: ["accepted", "rejected"] }
    });

    return res.status(200).json({ count });

  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
module.exports = {swapProduct,getSwapRequest,acceptSwapRequest,rejectSwapRequest,mySwapRequests,notificationCount}