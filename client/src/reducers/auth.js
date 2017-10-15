import { Types } from "../actions/types";

const INITIAL = null;
export default function(state = INITIAL, action) {
  switch (action.type) {
    case Types.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
