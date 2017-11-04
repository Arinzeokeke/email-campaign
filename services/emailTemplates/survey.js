const keys = require('../../config/keys')

module.exports = survey => {
  return `
  <html>
    <body>
      <div style-"text-align: center;">
        <p> Give your input </p>

        <p>${survey.body}</p>
        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
        <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
      </div>
    <body>
  </html>
  `
}
