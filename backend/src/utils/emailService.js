import nodemailer from "nodemailer";
import axios from "axios";


export const sendVerificationEmail = async (toEmail, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  const mailOptions = {
    from: `"Cirmatch Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Cirmatch Email Verification",
    html: `<p>Your verification code is: <b>${code}</b></p><p>It will expire in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};


export const sendVerificationSMS = async (toNumber, code) => {
  try {
    if (!toNumber.startsWith("88")) {
      toNumber = "88" + toNumber;
    }
    const response = await axios.post("http://bulksmsbd.net/api/smsapi", {
      api_key: process.env.SMS_API_KEY,  
      senderid: process.env.SMS_SENDER_ID, 
      number: toNumber,
      message: `Your Cirmatch verification code is: ${code}. It will expire in 10 minutes.`,
    });

    console.log("SMS sent:", response.data);
  } catch (error) {
    console.error("SMS sending failed:", error.message);
    throw new Error("Failed to send SMS");
  }
};
