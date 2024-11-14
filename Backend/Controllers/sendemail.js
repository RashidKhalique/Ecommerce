import nodemailer from 'nodemailer';
import asyncHandler from 'express-async-handler';
const sendEmail = asyncHandler(async (req, res) => {
    const { to, subject, text, html } = req.body;

    // Validate input
    if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ success: false, message: 'Missing required fields: to, subject, and either text or html.' });
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_ID, // Your Gmail address
            pass: process.env.MP, // Your Gmail password or app password
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"BuyNow" <BuyNow@gmail.com>', // Update sender's name and email
            to,
            subject,
            text,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        return res.status(200).json({ success: true, message: 'Email sent successfully!', messageId: info.messageId });
    } catch (error) {
        console.error('Error sending email:', error.message);
        return res.status(500).json({ success: false, message: 'Failed to send email.', error: error.message });
    }
});

export default sendEmail;
