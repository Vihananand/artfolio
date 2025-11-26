import { getMailjetClient } from "../config/email.js";
import {
  welcomeEmailTemplate,
  resetPasswordEmailTemplate,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const mailjet = getMailjetClient();
    
    const request = mailjet.post('send', { version: 'v3' }).request({
      FromEmail: process.env.SENDER_EMAIL || "noreply@yourdomain.com",
      FromName: "Artist Portfolio",
      Subject: "🎨 Welcome to Artist Portfolio - Let's Get Started!",
      "Html-part": welcomeEmailTemplate(userName),
      Recipients: [{ Email: userEmail }],
    });

    const result = await request;
    console.log(`✅ Welcome email sent to ${userEmail}`);
    console.log(`📧 Message ID: ${result.body.Sent[0]?.MessageID}`);
    return { success: true, messageId: result.body.Sent[0]?.MessageID };
  } catch (error) {
    console.error("❌ Error sending welcome email:", error.message);
    return { success: false, error: error.message };
  }
};

export const sendPasswordResetEmail = async (
  userEmail,
  userName,
  resetLink
) => {
  try {
    const mailjet = getMailjetClient();
    
    const request = mailjet.post('send', { version: 'v3' }).request({
      FromEmail: process.env.SENDER_EMAIL || "security@yourdomain.com",
      FromName: "Artist Portfolio Security",
      Subject: "🔐 Reset Your Password - Artist Portfolio",
      "Html-part": resetPasswordEmailTemplate(userName, resetLink),
      Recipients: [{ Email: userEmail }],
    });

    const result = await request;
    console.log(`✅ Password reset email sent to ${userEmail}`);
    console.log(`📧 Message ID: ${result.body.Sent[0]?.MessageID}`);
    return { success: true, messageId: result.body.Sent[0]?.MessageID };
  } catch (error) {
    console.error("❌ Error sending password reset email:", error.message);
    return { success: false, error: error.message };
  }
};
