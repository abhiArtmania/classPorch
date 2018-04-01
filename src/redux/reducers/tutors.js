import {
  GET_TUTOR_SCHEDULE,
} from "../../redux/actions/types";

const initialState = {
  tutorSchedule: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TUTOR_SCHEDULE:
      return {
        ...state,
        tutorSchedule: action.schedule,
      };
    default:
      return state;
  }
}
  