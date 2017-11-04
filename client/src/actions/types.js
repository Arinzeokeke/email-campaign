import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  fetchUser: ['payload'],
  submitSurvey: null,
  fetchSurveys: ['payload'],
  custom: (a, b) => ({ type: 'CUSTOM', total: a + b })
})
