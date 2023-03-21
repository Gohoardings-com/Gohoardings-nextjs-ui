const nodemailer = require('nodemailer')
exports.sendEmail = async (options) => {
    var transport = nodemailer.createTransport({

        host: "smtp.elasticemail.com",
        port: 2525,
        secureConnection: true,
        auth: {
            user:  "vivek@gohoardings.com",
            pass: "FE983315682E55FFC8F24A1E13EAE013D080"
        }
    });

    const mailOptions = {
        from:   "vivek@gohoardings.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
        attachments: options.attachments
    }

    transport.sendMail(mailOptions, function (error, response) {
        if (error) {
            return error
        } else {
            return true
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });


}