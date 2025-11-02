// utils/emailTemplates/verificationEmailTemplate.js

export const getVerificationEmailHtml = (code) => `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Cirmatch Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f7f8;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:30px 10px;">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(90deg,#0ea5a4,#008080); padding:20px 24px; color:#ffffff; text-align:left;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="font-family:Arial, sans-serif; font-size:20px; font-weight:700;">Cirmatch</div>
                    <div style="font-family:Arial, sans-serif; font-size:12px; opacity:0.95; margin-top:4px;">Support Team</div>
                  </td>
                  <td style="vertical-align:middle; text-align:right;">
                    <div style="width:48px; height:48px; border-radius:8px; background:rgba(255,255,255,0.12); display:inline-block;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 28px 18px 28px; font-family:Arial, sans-serif; color:#333333;">
              <h1 style="margin:0 0 12px 0; font-size:20px; font-weight:700; color:#073642;">ইমেইল ভেরিফিকেশন কোড</h1>
              <p style="margin:0 0 18px 0; font-size:14px; line-height:1.5; color:#515151;">
                হ্যালো, <br>
                Cirmatch-এ সাইন-আপ বা ইমেইল যাচাই করার জন্য নিচের কোডটি ব্যবহার করুন। কোডটি ১০ মিনিট সময়ের মধ্যে ইস্যু হয়ে যাবে।
              </p>
              <div style="margin:18px 0; text-align:center;">
                <div style="display:inline-block; padding:16px 22px; border-radius:8px; background:#e6fffb; border:1px solid #c7f3ef; font-family: 'Courier New', monospace; font-size:28px; letter-spacing:4px; color:#006e6e;">
                  <strong>${code}</strong>
                </div>
              </div>
              <p style="margin:0 0 22px 0; text-align:center;">
                <a href="#" style="text-decoration:none; display:inline-block; padding:12px 24px; border-radius:6px; background:linear-gradient(90deg,#008080,#06b2ac); color:#ffffff; font-weight:600; font-size:14px;">
                  কোড কপি করুন
                </a>
              </p>
              <p style="margin:0; font-size:13px; color:#6b6b6b;">
                যদি আপনি এই অনুরোধটি জানেন না, তাহলে নিরাপত্তার স্বার্থে আপনি এই ইমেইলটি উপেক্ষা করতে পারেন। আরও সহায়তার জন্য আমাদের সাপোর্ট টিমকে জানাবেন।
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:18px 28px; background:#f7faf9; text-align:center; font-family:Arial, sans-serif; font-size:12px; color:#8a8a8a;">
              <div style="margin-bottom:6px;">Cirmatch • Building a greener tomorrow</div>
              <div>© ${new Date().getFullYear()} Cirmatch. All rights reserved.</div>
              <div style="margin-top:8px;">If you didn't request this verification, no action is required.</div>
            </td>
          </tr>
        </table>

        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px; margin-top:12px;">
          <tr>
            <td style="text-align:center; font-family:Arial, sans-serif; font-size:12px; color:#9aa0a6;">
              If you need help, reply to this email or contact support@cirmatch.example
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
