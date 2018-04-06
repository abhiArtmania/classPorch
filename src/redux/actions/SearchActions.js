import { apiEndpoints } from './../../ApiEndpoints';
import {
	SEARCH_START,
	SEARCH_SUCCESS,
	SEARCH_FAIL,
	TOGGLE_SEARCH_MODE
} from './types'

export const searchRequested = params => {
	const store = localStorage.getItem("store");
  const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
  
  const { gender, q, type, page_no } = params;
	return async (dispatch) => {
		try {
			dispatch({ type: SEARCH_START });

			let rawRes = await fetch(`${apiEndpoints.base}/search?type=${type}&q=${q}&page_no=${page_no}&gender=${gender}`,{
				headers: {
					'auth-token': token
				}
			});
			let res = await rawRes.json();

			return dispatch({ type: SEARCH_SUCCESS, payload: res.response })
		} catch (e) {
			return dispatch({ type: SEARCH_FAIL, payload: e })
		}
	}
};

export const toggleSearchMode = (mode) => {
	return {
		type: TOGGLE_SEARCH_MODE,
		payload: mode
	}
};
