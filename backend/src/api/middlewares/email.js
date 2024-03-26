const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "SMTP",
    host: "mail.uxd.co.jp",
    port: 587,
    secure: false,
    auth: {
        user: "smartoffice@uxd.co.jp",
        pass: "bimGLbGUQr6g"
    },
    tls: { 
        rejectUnauthorized: false, 
    }
    });

    module.exports = {
        transporter,
        close: () => {
          transporter.close(true);
        }
      };