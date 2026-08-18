const userModel = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils/sendEmail");
const getClientUrl = require("../utils/getClientUrl");
const reviewModel = require("../model/reviewModel");


const saveUser = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        email = email.trim().toLowerCase();
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists", });
        }
        const hashpassword = await bcrypt.hash(password, 10)

        const user = new userModel({
            name,
            email,
            password: hashpassword
        })
        await user.save()

        res.status(201).json({ message: 'User Created Successfully' })
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
        const { token } = req.body;
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

module.exports = { saveUser, loginUser, updateProfile, getProfile, removeProfilePhoto, forgotPassword, resetPassword, googleLogin }