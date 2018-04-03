// import { request } from "utils/request";
import { apiEndpoints } from '../../ApiEndpoints';
import { GET_TUTOR_SCHEDULE } from "./types";

export function setTutorSchedule(schedule) {
  return { schedule, type: GET_TUTOR_SCHEDULE };
}
export function getTutorSchedule(tutorId) {
  return async dispatch => {
    const store = localStorage.getItem("store");
    const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
    let r = await fetch(`${apiEndpoints.base}/tutor_schedules?tutor_id=${tutorId}`, {
      headers: {
        'auth-token': token
      }
    });
    const res = await r.json();
    dispatch(setTutorSchedule(res.response));

    // return request()
    //   .get(`/tutor_schedules?tutor_id=${tutorId}`)
    //   .then(response => {
    //     console.log(response)
    //     dispatch(setTutorSchedule(response.data));
    //   });
  };
}

export function setUserInfo(userInfo) {
  return { userInfo, type: GET_USER_INFO };
}
export function getUserInfo(tutorId) {
  return async dispatch => {
    const store = localStorage.getItem("store");
    const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
    let r = await fetch(`${apiEndpoints.base}/user/${tutorId}/profile`, {
      headers: {
        'auth-token': token
      }
    });
    const res = await r.json();
    dispatch(setUserInfo(res.response));
  };
}

export default {
  getTutorSchedule,
  getUserInfo,
};
