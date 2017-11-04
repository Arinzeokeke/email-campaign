import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  fetchUser: ['payload'],
  submitSurvey: null,
  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
})
