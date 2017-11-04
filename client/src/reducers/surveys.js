import { Types } from '../actions/types'

const INITIAL = []
export default function(state = INITIAL, action) {
  switch (action.type) {
    case Types.FETCH_SURVEYS:
      return action.payload || []
    default:
      return state
  }
}
