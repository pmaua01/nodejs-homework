const nodemailer = require("nodemailer");

async function sendMail({ to, html, subject }) {
  try {
    const email = {
      from: "info@info.ua",
      to,
      html,
      subject,
    };
    console.log("to", to);

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "acf906a51c3179",
        pass: "0ba99af87c5b6b",
      },
    });

    const mail = await transport.sendMail(email);
    console.log(mail);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMail };
