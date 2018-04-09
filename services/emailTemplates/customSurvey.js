const keys = require('../../config/keys')

module.exports = (survey, email) => {
  return {
    subject: 'Please take this survey!',
    html: `
  <html>
    <body>
      <div style-"text-align: center;">
        <p> Give your input </p>

        <p>${survey.body}</p>
        <a href="${keys.apiUrl}api/surveys/${
      survey.id
    }/yes?email=${email}">Yes</a>
        <a href="${keys.apiUrl}api/surveys/${
      survey.id
    }/no?email=${email}">No</a>
      </div>
    <body>
  </html>
  `,
    text: `Give your input 
    ${survey.body}
      Yes:  "${keys.apiUrl}api/surveys/${
      survey.id
    }/yes?email=${email}?email=${email}"
      
       No: "${keys.apiUrl}api/surveys/${survey.id}/no?email=${email}"`
  }
}
