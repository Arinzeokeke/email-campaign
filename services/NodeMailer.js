const nodemailer = require('nodemailer')
const config = require('../config/keys')

const mailer = (mail, to, from = config.mail.from.email) => {
  const transporter = getTransporter(config)
  const mailOptions = processMailOptions(mail, to, from)
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
