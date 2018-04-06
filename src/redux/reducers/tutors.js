import {
  GET_TUTOR_SCHEDULE,
  GET_USER_INFO,
} from "../../redux/actions/types";

const initialState = {
  tutorSchedule: {},
  userInfo: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TUTOR_SCHEDULE:
      return {
        ...state,
        tutorSchedule: action.schedule,
      };
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    default:
      return state;
  }
}
  