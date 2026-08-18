const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const isDummyEmail = (email) => {
    if (!email) return true;
    const emailLower = email.toLowerCase().trim();
    
    const dummyList = [
        "yo@gmail.com",
        "dummy@gmail.com",
        "test@gmail.com",
        "sender@gmail.com",
        "receiver@gmail.com",
        "aman@gmail.com",
        "yogesh@gmail.com"
    ];
    
    const domain = emailLower.split("@")[1];
    
    return (
        dummyList.includes(emailLower) ||
        domain === "example.com" ||
        domain === "test.com" ||
        emailLower.endsWith(".test")
    );
};

const sendEmail = async (to, subject, html) => {
    if (isDummyEmail(to)) {
        console.log(`[EMAIL BYPASS] Skipping email sending for dummy address: ${to}`);
        return;
    }

    await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;