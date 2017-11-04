const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const validateEmails = emails => {
  const invalidEmails = emails
    .split(',')
    .map(each => each.trim())
    .filter(each => !EMAIL_REGEX.test(each))

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`
  }
  return null
}

export const FIELDS = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Survey Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipients List', name: 'recipients' }
]
