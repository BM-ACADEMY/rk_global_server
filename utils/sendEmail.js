const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (
  name,
  email,
  phone,
  position,
  message,
  subject,
  resumeUrl
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email 1: To company (EMAIL_USER) with application details
  const companyMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to company email
    subject: "New Job Application - RK Global Associates",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #ffffff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="text-align: center; border-bottom: 2px solid #4a90e2; padding-bottom: 15px; margin-bottom: 20px;">
                    <h1 style="color: #4a90e2; margin: 0; font-size: 28px;">RK Global Associates</h1>
                    <h2 style="color: #333333; margin: 5px 0; font-size: 22px;">New Job Application</h2>
                </div>
                <div style="color: #333333;">
                    <p style="margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <strong style="color: #4a90e2;">Applicant Name:</strong> ${name}
                    </p>
                    <p style="margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <strong style="color: #4a90e2;">Email:</strong> ${email}
                    </p>
                    <p style="margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <strong style="color: #4a90e2;">Phone:</strong> ${phone}
                    </p>
                    <p style="margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <strong style="color: #4a90e2;">Position:</strong> ${position}
                    </p>
                    <p style="margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <strong style="color: #4a90e2;">Message:</strong> ${message}
                    </p>
                    <p style="margin: 10px 0; padding: 10px; background-color: #f8f9fa; border-radius: 5px;">
                        <strong style="color: #4a90e2;">Subject:</strong> ${subject}
                    </p>
                </div>
                <div style="text-align: center; margin-top: 25px;">
                    <a href="${resumeUrl}" target="_blank" 
                       style="display: inline-block; padding: 12px 25px; background-color: #4a90e2; color: white; 
                              text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Download Resume
                    </a>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
                <p>RK Global Associates | Connecting Talent with Opportunity</p>
                <p>© ${new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </div>
    `,
  };

  // Email 2: Confirmation to applicant
  const applicantMailOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Send to applicant's email
    subject: "Application Received - RK Global Associates",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #ffffff; border-radius: 8px; padding: 25px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                <div style="text-align: center; border-bottom: 2px solid #4a90e2; padding-bottom: 15px; margin-bottom: 20px;">
                    <h1 style="color: #4a90e2; margin: 0; font-size: 28px;">RK Global Associates</h1>
                    <h2 style="color: #333333; margin: 5px 0; font-size: 22px;">Application Received</h2>
                </div>
                <div style="color: #333333;">
                    <p>Dear ${name},</p>
                    <p>Thank you for your application for the ${position} position at RK Global Associates. We have successfully received your submission.</p>
                    <p><strong>What happens next:</strong></p>
                    <ul style="list-style-position: inside;">
                        <li>Our team will review your application</li>
                        <li>We’ll contact you if your profile matches our requirements</li>
                        <li>You’ll hear back from us within 5-7 business days</li>
                    </ul>
                    <p>If you have any questions, feel free to reply to this email.</p>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #666666; font-size: 12px;">
                <p>RK Global Associates | Connecting Talent with Opportunity</p>
                <p>© ${new Date().getFullYear()} All Rights Reserved</p>
            </div>
        </div>
    `,
  };

  try {
    // Send email to company
    await transporter.sendMail(companyMailOptions);
    // Send confirmation to applicant
    await transporter.sendMail(applicantMailOptions);
    return { success: true, message: "Emails sent successfully" };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send emails");
  }
};

module.exports = sendEmail;