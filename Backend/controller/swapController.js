const swapModel = require('../model/swapModel.js');
const userModel = require('../model/userModel.js');
const notificationModel = require('../model/notificationModel.js');
const { getIo } = require('../socket.js');
const getClientUrl = require('../utils/getClientUrl.js');
const reviewModel = require('../model/reviewModel.js');

const expireOldRequests = async () => {
    try {
        const expiryTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        await swapModel.updateMany(
            {
                status: "pending",
                createdAt: { $lt: expiryTime }
            },
            {
                $set: { status: "expired" }
            }
        );
    } catch (err) {
        console.error("Error auto-expiring old swap requests:", err);
    }
};

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

        try {
            const senderUser = await userModel.findById(req.user.id);
            const receiverUser = await userModel.findById(req.body.receiver);
            
            // Require product model dynamically to avoid circular references
            const productModel = require("../model/productModel.js");
            const reqProduct = await productModel.findById(req.body.requestedProduct);

            const notification = new notificationModel({
                recipient: req.body.receiver,
                sender: req.user.id,
                type: "new_swap_request",
                message: `${senderUser ? senderUser.name : "Someone"} sent you a swap request`,
                relatedId: swapItem._id,
            });
            await notification.save();

            const io = getIo();
            if (io) {
                const populatedNotif = await notificationModel.findById(notification._id)
                    .populate("sender", "name profileImage");
                io.to(req.body.receiver.toString()).emit("newNotification", populatedNotif);
            }

            // Asynchronously send email notification
            if (receiverUser && receiverUser.email && senderUser) {
                const clientUrl = getClientUrl(req);
                const productName = reqProduct ? reqProduct.productName : "your product";
                const subject = "🔄 New Swap Request on SwapHub";
                const html = `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <span style="font-size: 40px;">🔄</span>
                        </div>
                        <h2 style="color: #1e293b; font-size: 20px; font-weight: 800; text-align: center; margin-top: 0; margin-bottom: 20px;">New Swap Request on SwapHub</h2>
                        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                            Hello <strong>${receiverUser.name}</strong>,
                        </p>
                        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                            <strong>${senderUser.name}</strong> has sent you a swap request for your product "<strong>${productName}</strong>".
                        </p>
                        <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                            <a href="${clientUrl}/swapRequest" style="background-color: #2E7D32; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(46, 125, 50, 0.25);">View Request →</a>
                        </div>
                    </div>
                `;
                const sendEmail = require("../utils/sendEmail.js");
                sendEmail(receiverUser.email, subject, html).catch((err) => {
                    console.error("SMTP error sending new swap request email:", err.message);
                });
            }
        } catch (err) {
            console.error("Error creating swap notification:", err);
        }

        return res.status(201).json({message: "Swap request sent successfully",swapItem});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const getSwapRequest = async (req, res) => {
    try {
       await expireOldRequests();
       const request = await swapModel.find({receiver: req.user.id}).sort({ createdAt: -1 })
          .populate("sender", "name email")
          .populate("requestedProduct","productName image category location")
          .populate("offeredProduct","productName image category location");

       const requestWithRating = await Promise.all(request.map(async (item) => {
           const doc = item.toObject();
           const review = await reviewModel.findOne({ reviewer: req.user.id, swapRequest: item._id });
           doc.userRating = review ? review.rating : null;
           return doc;
       }));

       return res.status(200).json(requestWithRating);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Something went wrong"});
    }
};

const acceptSwapRequest = async (req, res) => {
    try {
        await expireOldRequests();
        const request = await swapModel.findById(req.params.id);
        if (!request) {
            return res.status(404).json({message: "Request not found"});
        }

        if (request.status === "expired") {
            return res.status(400).json({message: "This swap request has expired."});
        }

        //  Security Check
        if (request.receiver.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized"});
        }

        request.status = "accepted";
        await request.save();

        try {
            const senderUser = await userModel.findById(request.sender);
            const receiverUser = await userModel.findById(req.user.id);
            
            const productModel = require("../model/productModel.js");
            const reqProduct = await productModel.findById(request.requestedProduct);

            const notification = new notificationModel({
                recipient: request.sender,
                sender: req.user.id,
                type: "swap_accepted",
                message: "Your swap request was accepted",
                relatedId: request._id,
            });
            await notification.save();

            const io = getIo();
            if (io) {
                const populatedNotif = await notificationModel.findById(notification._id)
                    .populate("sender", "name profileImage");
                io.to(request.sender.toString()).emit("newNotification", populatedNotif);
            }

            // Asynchronously send email notification
            if (senderUser && senderUser.email && receiverUser) {
                const clientUrl = getClientUrl(req);
                const productName = reqProduct ? reqProduct.productName : "your product";
                const subject = "✅ Swap Request Accepted on SwapHub";
                const html = `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <span style="font-size: 40px;">✅</span>
                        </div>
                        <h2 style="color: #1e293b; font-size: 20px; font-weight: 800; text-align: center; margin-top: 0; margin-bottom: 20px;">Swap Request Accepted!</h2>
                        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                            Hello <strong>${senderUser.name}</strong>,
                        </p>
                        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                            Your swap request for product "<strong>${productName}</strong>" was accepted by <strong>${receiverUser.name}</strong>.
                        </p>
                        <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                            <a href="${clientUrl}/mySwapRequests" style="background-color: #2E7D32; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(46, 125, 50, 0.25);">View My Swap Requests →</a>
                        </div>
                    </div>
                `;
                const sendEmail = require("../utils/sendEmail.js");
                sendEmail(senderUser.email, subject, html).catch((err) => {
                    console.error("SMTP error sending swap acceptance email:", err.message);
                });
            }
        } catch (err) {
            console.error("Error creating swap acceptance notification:", err);
        }

        return res.status(200).json({ message: "Swap request accepted", request,});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Something went wrong"}); 
    }
};

const rejectSwapRequest = async(req,res)=>{
    try {
        await expireOldRequests();
        const request = await swapModel.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                message: "Request not found"
            });
        }

        if (request.status === "expired") {
            return res.status(400).json({
                message: "This swap request has expired."
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

        try {
            const senderUser = await userModel.findById(request.sender);
            const receiverUser = await userModel.findById(req.user.id);
            
            const productModel = require("../model/productModel.js");
            const reqProduct = await productModel.findById(request.requestedProduct);

            const notification = new notificationModel({
                recipient: request.sender,
                sender: req.user.id,
                type: "swap_rejected",
                message: "Your swap request was rejected",
                relatedId: request._id,
            });
            await notification.save();

            const io = getIo();
            if (io) {
                const populatedNotif = await notificationModel.findById(notification._id)
                    .populate("sender", "name profileImage");
                io.to(request.sender.toString()).emit("newNotification", populatedNotif);
            }

            // Asynchronously send email notification
            if (senderUser && senderUser.email && receiverUser) {
                const clientUrl = getClientUrl(req);
                const productName = reqProduct ? reqProduct.productName : "your product";
                const subject = "❌ Swap Request Rejected on SwapHub";
                const html = `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                        <div style="text-align: center; margin-bottom: 20px;">
                            <span style="font-size: 40px;">❌</span>
                        </div>
                        <h2 style="color: #1e293b; font-size: 20px; font-weight: 800; text-align: center; margin-top: 0; margin-bottom: 20px;">Swap Request Rejected</h2>
                        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                            Hello <strong>${senderUser.name}</strong>,
                        </p>
                        <p style="color: #475569; font-size: 14px; line-height: 1.6;">
                            Your swap request for product "<strong>${productName}</strong>" was declined by <strong>${receiverUser.name}</strong>.
                        </p>
                        <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
                            <a href="${clientUrl}/mySwapRequests" style="background-color: #d32f2f; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(211, 47, 47, 0.25);">View My Swap Requests →</a>
                        </div>
                    </div>
                `;
                const sendEmail = require("../utils/sendEmail.js");
                sendEmail(senderUser.email, subject, html).catch((err) => {
                    console.error("SMTP error sending swap rejection email:", err.message);
                });
            }
        } catch (err) {
            console.error("Error creating swap rejection notification:", err);
        }

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
        await expireOldRequests();
        const requests = await swapModel.find({
            sender: req.user.id
        }).sort({ createdAt: -1 })
        .populate("receiver", "name email")
        .populate("requestedProduct", "productName image")
        .populate("offeredProduct", "productName image");

        const requestsWithRating = await Promise.all(requests.map(async (item) => {
            const doc = item.toObject();
            const review = await reviewModel.findOne({ reviewer: req.user.id, swapRequest: item._id });
            doc.userRating = review ? review.rating : null;
            return doc;
        }));

        return res.status(200).json(requestsWithRating);

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
const notificationCount = async (req, res) => {
  try {
    await expireOldRequests();
    const receivedPendingCount = await swapModel.countDocuments({
      receiver: req.user.id,
      status: "pending"
    });

    const sentUpdatesCount = await swapModel.countDocuments({
      sender: req.user.id,
      status: { $in: ["accepted", "rejected"] }
    });

    const count = receivedPendingCount + sentUpdatesCount;
    return res.status(200).json({ count });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};
module.exports = {swapProduct,getSwapRequest,acceptSwapRequest,rejectSwapRequest,mySwapRequests,notificationCount}