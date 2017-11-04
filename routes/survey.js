const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')

const auth = require('../middlewares/authenticate')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/survey')
const Survey = mongoose.model('surveys')

router.use(auth)

router.get('/thanks', (req, res) => {
  res.send('Thanks for voting!')
})

router.post('/api/survey/webhooks', (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice')

  const events = _.chain(
    req.body.map(({ email, url }) => {
      const match = p.test(new URL(url).pathname)
      if (match) {
        return { email, ...choice }
      }
    })
  )
    .compact()
    .uniqBy('email', 'surveyId')
    .value()

  return res.send(events)
})

router.post('/', requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now()
  })
  const mailer = new Mailer(survey, surveyTemplate(survey))

  try {
    await mailer.send()
    await survey.save()
    req.user.credits -= 1
    const user = await req.user.save()
    res.send(user)
  } catch (err) {
    res.status(422).send(err)
  }
})

module.exports = router
