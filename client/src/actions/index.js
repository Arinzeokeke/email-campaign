import axios from 'axios'
import { Creators } from './types'

export const fetchUser = () => async dispatch => {
  const user = await axios.get('/api/user')
  dispatch(Creators.fetchUser(user.data))
}

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token)
  dispatch(Creators.fetchUser(res.data))
}

export const submitSurvey = ({ values, history }) => async dispatch => {
  const res = await axios.post('api/surveys', values)
  history.push('/surveys')
  dispatch(Creators.fetchUser(res.data))
}

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys')

  dispatch(Creators.fetchSurveys(res.data))
}
