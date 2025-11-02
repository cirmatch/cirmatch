import nodemailer from "nodemailer";
import axios from "axios";
import dotenv from "dotenv";
import { getVerificationEmailHtml } from "./verificationHtmlLayout.js";
dotenv.config({ path: "../../.env" });

export const sendVerificationEmail = async (toEmail, code) => {
  const htmlContent = getVerificationEmailHtml(code);

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
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Helper: Send Email with Crimatch style
 */
export const sendEmail = async (toEmail, subject, message) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${subject}</title>
        <style>
          body {
            margin: 0;
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f4f8f8;
          }
          .container {
            max-width: 650px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
            overflow: hidden;
          }
          .header {
            background-color: #009688;
            padding: 25px;
            text-align: center;
            color: #ffffff;
          }
          .header h2 {
            margin: 0;
            font-size: 22px;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 30px;
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
          }
          .content p {
            margin: 10px 0;
          }
          .footer {
            background-color: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 13px;
            color: #777;
          }
          .btn {
            display: inline-block;
            background-color: #00bfa5;
            color: #fff;
            padding: 10px 18px;
            margin-top: 15px;
            border-radius: 6px;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>${subject}</h2>
          </div>
          <div class="content">
            <p>${message}</p>
            <p>Best Regards,<br/><strong>Crimatch Team</strong></p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Crimatch. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    // Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: `"Crimatch Support" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${toEmail}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};


export const sendVerificationSMS = async (toNumber, code) => {
  try {
    // Ensure Bangladeshi number format
    if (!toNumber.startsWith("88")) {
      toNumber = "88" + toNumber;
    }
    // Construct the URL with all required parameters
    const url = `http://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${toNumber}&senderid=${process.env.SMS_SENDER_ID}&message=${encodeURIComponent(`Your Cirmatch OTP is ${code}. It will expire in 10 minutes.`)}`;

    const response = await axios.get(url);


    if (response.data.response_code !== 202) {
      throw new Error(`SMS failed: ${response.data.error_message}`);
    }
  } catch (error) {
    console.error("SMS sending failed:", error.message);
    throw new Error("Failed to send SMS");
  }
};