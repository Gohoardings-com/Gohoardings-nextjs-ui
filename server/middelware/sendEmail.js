const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    bcc: options.bcc || undefined,
    subject: options.subject,
    text: options.message,
    html: options.html,   
    attachments: options.attachments || [],
  };

  // ✅ Use promise-style sendMail
  try {
    const info = await transport.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response); // Debug log
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error; // let the caller catch and handle this
  }
};
