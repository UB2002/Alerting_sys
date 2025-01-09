const nodemailer = require('nodemailer');

const sendAlert = async (email, ip) =>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
});
    await transporter.sendMail({
        from : process.env.SMTP_USER,
        to: email,
        subject: 'Alert',
        text: `IP ${ip} has exceeded the failed request limit`
     });

};

module.exports = sendAlert;