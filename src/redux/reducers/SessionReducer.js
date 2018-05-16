import {
  COMPLETED_SESSION_SUCCESS,
  PENDING_SESSION_SUCCESS,
  SCHEDULED_SESSION_SUCCESS,
  SESSION_FAIL,
} from '../actions/types'

const INITIAL_STATE = {
  session_pending: [],
  session_scheduled: [],
  session_completed: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPLETED_SESSION_SUCCESS:
      const session_completed = action.payload;
      return { ...state, session_completed };
    case PENDING_SESSION_SUCCESS:
      const session_pending = action.payload;
      return { ...state, session_pending };
    case SCHEDULED_SESSION_SUCCESS:
      const session_scheduled = action.payload;
      return { ...state, session_scheduled };
    case SESSION_FAIL:
      return { ...state, loadingSearch: false, searchError: action.payload };
    default:
      return state
  }
}