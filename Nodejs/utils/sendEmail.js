const nodemailer = require('nodemailer');

module.exports.sendEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        // logger: true,
        // debug: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: true
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP',
        text: `OTP của bạn là ${otp}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Lỗi khi gửi email', error);
        } else {
            console.log('Email đã gửi thành công:', info.response);
        }
    });
}