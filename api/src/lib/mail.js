const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: "sistema@e-hsn.com",
    pass: "Lais@1234",
  },
});

const sendMail = async (to = '', subject = '', html = '') => {

  const mailOptions = {
    from: 'sistema@e-hsn.com',
    to,
    subject,
    html
  };

  await transporter.sendMail(mailOptions);
}


module.exports = { sendMail }