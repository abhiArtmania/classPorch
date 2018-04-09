import { apiEndpoints } from '../../ApiEndpoints';
import {
	
	SESSION_SUCCESS,
	SESSION_FAIL,
	
} from './types'

export const sessionRequested = params => {
	const store = localStorage.getItem("store");
  const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
  
  const { status, type, page_no } = params;
	return async (dispatch) => {
		try {
			
			let rawRes = await fetch(`${apiEndpoints.base}/session_requests?status=scheduled&page_no=1`,{
				headers: {
					'auth-token': token
				}
			});
			let res = await rawRes.json();

			return dispatch({ type: SESSION_SUCCESS, payload: res.response })
		} catch (e) {
			return dispatch({ type: SESSION_FAIL, payload: e })
		}
	}
};

