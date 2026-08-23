const userModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils/sendEmail");
const getClientUrl = require("../utils/getClientUrl");
const reviewModel = require("../model/reviewModel");
const otpModel = require("../model/otpModel.js");


const saveUser = async (req, res) => {
    try {
        let { name, email, password, otp } = req.body;
        if (!name || !email || !password || !otp) {
            return res.status(400).json({ message: "All fields including OTP are required" });
        }
        email = email.trim().toLowerCase();
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists", });
        }

        // Verify OTP
        const otpRecord = await otpModel.findOne({ email });
        if (!otpRecord || otpRecord.otp !== otp.trim()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hashpassword = await bcrypt.hash(password, 10)

        const user = new userModel({
            name,
            email,
            password: hashpassword
        })
        await user.save()

        // Delete used OTP record
        await otpModel.deleteMany({ email });

        return res.status(201).json({ message: 'User Created Successfully' })
    } catch (error) {
        console.log("ERROR:", error)
        return res.status(500).json({
            error: error.message,
            fullError: error
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const { password } = req.body;
        const email = req.body.email?.trim().toLowerCase();

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ message: 'Incorrect password' })
        }
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ message: "Login Successfully", token, user });
    } catch (error) {
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

        if (!user) { return res.status(404).json({ message: "User not found", }); }

        if (req.body.name) { user.name = req.body.name; }

        if (req.body.phone !== undefined) { user.phone = req.body.phone; }

        if (req.body.location !== undefined) { user.location = req.body.location; }

        if (req.file) { user.profileImage = req.file.path; }

        await user.save();

        const updatedUser = await userModel
            .findById(req.user.id)
            .select("-password");

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

const sendRegistrationOtp = async (req, res) => {
    try {
        let { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        email = email.trim().toLowerCase();

        // Check if email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Generate 6 digit random numeric OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save OTP to DB (upsert)
        await otpModel.findOneAndUpdate(
            { email },
            { otp, createdAt: new Date() },
            { upsert: true, new: true }
        );

        // Send OTP via email
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 8px;">
                <h2 style="color: #2E7D32; text-align: center;">SwapHub Email Verification</h2>
                <p>Hello,</p>
                <p>Thank you for registering on SwapHub. Please use the following 6-digit One-Time Password (OTP) to verify your account registration. This OTP is valid for 5 minutes:</p>
                <div style="font-size: 24px; font-weight: bold; text-align: center; color: #2E7D32; background-color: #e8f5e9; padding: 15px; border-radius: 4px; letter-spacing: 4px; margin: 20px 0;">
                    ${otp}
                </div>
                <p>If you did not initiate this request, please ignore this email.</p>
                <br>
                <p>Best regards,<br>The SwapHub Team</p>
            </div>
        `;
        
        await sendEmail(email, "SwapHub - Account Registration Verification OTP", html);

        return res.status(200).json({ message: "OTP sent successfully to your email" });

    } catch (error) {
        console.error("Error sending registration OTP:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

const getProfile = async (req, res) => {
    try {
        const profile = await userModel.findById(req.user.id).select("-password").lean();
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" })
        }

        // Fetch user reviews
        const reviews = await reviewModel.find({ reviewedUser: req.user.id })
            .populate("reviewer", "name profileImage")
            .sort({ createdAt: -1 });

        let avgRating = 0;
        if (reviews.length > 0) {
            const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
            avgRating = (sum / reviews.length).toFixed(1);
        }

        profile.reviews = reviews;
        profile.avgRating = parseFloat(avgRating);
        profile.reviewCount = reviews.length;

        return res.status(200).json(profile)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

const removeProfilePhoto = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.profileImage = "";

        await user.save();

        const updatedUser = await userModel
            .findById(req.user.id)
            .select("-password");

        return res.status(200).json({
            message: "Profile photo removed successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Token generate kar rahe hain jo 15 minute me expire ho jayega
        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        const clientUrl = getClientUrl(req);
        const resetLink = `${clientUrl}/reset-password/${resetToken}`;

        // FIX: Duplicate sendEmail calls hata kar single formatted email bhej rahe hain
        await sendEmail(
            user.email,
            "SwapHub Password Reset",
            `
            <h2>Reset Your Password</h2>
            <p>Hello ${user.name},</p>
            <p>Click the button below to reset your password.</p>

            <a href="${resetLink}" style="
               display:inline-block;
               padding:10px 18px;
               background:#2E7D32;
               color:white;
               text-decoration:none;
               border-radius:6px;
            ">
            Reset Password
            </a>

            <p style="margin-top:15px;">Or copy and paste this link in your browser address bar:</p>
            <p style="word-break:break-all; color:#166534; font-weight:bold;">${resetLink}</p>

            <p>This link will expire in 15 minutes.</p>
            <p>If you didn't request this, you can safely ignore this email.</p>
            `
        );

        // FIX: Pehle res.status response missing tha jisse request hang ho rahi thi.
        // Ab hum frontend ko response bhej rahe hain ki email send ho gaya hai.
        return res.status(200).json({
            message: "Password reset link sent to your email"
        });

    } catch (error) {
        console.log("ERROR in forgotPassword:", error);
        return res.status(500).json({
            message: error.message || "Failed to send password reset email",
            error: error.message,
            fullError: error
        });
    }
};

// NAYA CHANGE: User jab email ke link par click karke naya password enter karega, 
// tab ye function token verify karega aur Naya Password Hash karke Database me save karega.
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({
                message: "Token and new password are required"
            });
        }

        // Token verify kar rahe hain (agar expire ho gaya hoga ya galat hoga to catch block me chalega)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Naye password ko bcrypt se hash karke database me save kar rahe hain
        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully"
        });

    } catch (error) {
        console.log("Reset Password Error:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Password reset link has expired" });
        }
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

const googleLogin = async (req, res) => {
    try {
        const { token, mode } = req.body;
        if (!token) {
            return res.status(400).json({ message: "Google token is required" });
        }

        const verifyResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
        if (!verifyResponse.ok) {
            return res.status(400).json({ message: "Invalid or expired Google token" });
        }

        const payload = await verifyResponse.json();
        const { email, name, picture } = payload;

        if (!email) {
            return res.status(400).json({ message: "Could not retrieve email from Google token" });
        }

        const normalizedEmail = email.toLowerCase().trim();
        let user = await userModel.findOne({ email: normalizedEmail });

        if (mode === "signup" && user) {
            return res.status(400).json({ message: "Account already exists with this email. Please login instead." });
        }

        if (!user) {
            // Create a randomized secure password placeholder
            const generatedPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).toUpperCase().slice(-8);
            const hashedPassword = await bcrypt.hash(generatedPass, 10);

            user = new userModel({
                name: name || "Google User",
                email: normalizedEmail,
                password: hashedPassword,
                profileImage: picture || ""
            });
            await user.save();
        } else if (!user.profileImage && picture) {
            user.profileImage = picture;
            await user.save();
        }

        const jwtToken = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login Successfully",
            token: jwtToken,
            user
        });

    } catch (error) {
        console.error("GOOGLE LOGIN ERROR:", error.message);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { saveUser, loginUser, updateProfile, getProfile, removeProfilePhoto, forgotPassword, resetPassword, googleLogin, sendRegistrationOtp }