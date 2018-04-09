const nodemailer = require('nodemailer')
const config = require('../config')

const mailer = (mail, to, from = config.from.email) => {
  const transporter = getTransporter(config)
  const mailOptions = processMailOptions(mail, to, from)
  console.log(mailOptions)
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error)
      }
      resolve(info)
    })
  })
}

const getTransporter = config =>
  nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure,
    auth: {
      user: config.mail.auth.user,
      pass: config.mail.auth.pass
    }
  })
const processMailOptions = (mail, to, from) => {
  from = from == null ? from : config.mail.from
  console.log(mail)
  const res = {
    from: `"${from.name}" <${from.email}>`,
    to: to.join(', '),
    subject: mail.subject,
    text: mail.text,
    html: mail.html
  }
  return res
}
module.exports = mailer
// module.exports.processMailOptions = processMailOptions
// module.exports.getTransporter = getTransporter
