import {apiEndpoints} from '../../ApiEndpoints';
import {history} from '../../redux/store';
import axios from 'axios'
import {deleteState} from '../localStorage';
import {
	
	SESSION_SUCCESS,
	SESSION_FAIL,
	
} from './types'

export const requestedSession = (params) => {
	const store = localStorage.getItem("store");
  const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
  
 const { status, type, page_no } = params;
	return async (dispatch) => {
		try {
			
			let rawRes = await fetch(`${apiEndpoints.base}/session_requests?status=${status}&page_no=${page_no}`,{
				headers: {
					'auth-token': token
				}
			});

			
			if (rawRes.status !== 200) {
				throw('Request failed. Please try again.')
			}
			let res = await rawRes.json();
			console.log('token');
			console.log(token);
			console.log(res);
			
			return dispatch({ type: SESSION_SUCCESS, payload: res.response })
		} catch (e) {
			return dispatch({ type: SESSION_FAIL, payload: e })
		}
	}
};

