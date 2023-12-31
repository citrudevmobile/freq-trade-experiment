const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
  host: 'smtp.ethereal.email',
  secure: false,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.Email_PASSWORD
  }
})

module.exports = {
  sendEmail: async function (mailOptions, callback) {
    await transporter.sendMail(mailOptions, function (err, info) {
      callback(err, info)
    })
  }
}
