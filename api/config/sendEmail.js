const nodemailer = require("nodemailer");

const sendEmail = async (to, verificationCode) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 587,
    secure: false,
    auth: {
      user: "omarbvy@yandex.com",
      pass: "nostradamus2425",
    },
  });

  const mailOptions = {
    from: "omarbvy@yandex.com",
    to,
    subject: "Şifre Sıfırlama Doğrulama Kodu",
    text: `Şifre sıfırlama kodunuz: ${verificationCode}`,
    html: `<p>Şifre sıfırlama kodunuz: <strong>${verificationCode}</strong></p>`,
  };

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("E-posta gönderildi:", info.response);
      return true;
    })
    .catch((error) => {
      console.error("E-posta gönderilemedi:", error);
      throw error;
    });
};

module.exports = sendEmail;
