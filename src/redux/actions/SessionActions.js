import { apiEndpoints } from '../../ApiEndpoints';
import { history } from '../../redux/store';
import axios from 'axios'
import { deleteState } from '../localStorage';
import {
	PENDING_SESSION_SUCCESS,
	COMPLETED_SESSION_SUCCESS,
	SCHEDULED_SESSION_SUCCESS,
	SESSION_FAIL,
} from './types'

export const scheduledSession = (params) => {
	const store = localStorage.getItem("store");
	const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
	const { status, type, page_no } = params;

	return async (dispatch) => {
		try {
			let rawRes = await fetch(`${apiEndpoints.base}/session_requests?status=scheduled&page_no=${page_no}`, {
				headers: {
					'auth-token': token
				}
			});

			if (rawRes.status !== 200) {
				throw ('Request failed. Please try again.')
			}

			let res = await rawRes.json();

			return dispatch({ type: SCHEDULED_SESSION_SUCCESS, payload: res.response })
		} catch (e) {
			return dispatch({ type: SESSION_FAIL, payload: e })
		}
	}
};
export const completedSession = (params) => {
	const store = localStorage.getItem("store");
	const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
	const { status, type, page_no } = params;

	return async (dispatch) => {
		try {
			let rawRes = await fetch(`${apiEndpoints.base}/session_requests?status=completed&page_no=${page_no}`, {
				headers: {
					'auth-token': token
				}
			});

			if (rawRes.status !== 200) {
				throw ('Request failed. Please try again.')
			}

			let res = await rawRes.json();

			return dispatch({ type: COMPLETED_SESSION_SUCCESS, payload: res.response })
		} catch (e) {
			return dispatch({ type: SESSION_FAIL, payload: e })
		}
	}
};
export const pendingSession = (params) => {
	const store = localStorage.getItem("store");
	const token = store && JSON.parse(store) ? JSON.parse(store).auth.authToken : "";
	const { status, type, page_no } = params;

	return async (dispatch) => {
		try {

			let rawRes = await fetch(`${apiEndpoints.base}/session_requests?status=pending&page_no=${page_no}`, {
				headers: {
					'auth-token': token
				}
			});

			if (rawRes.status !== 200) {
				throw ('Request failed. Please try again.')
			}

			let res = await rawRes.json();

			return dispatch({ type: PENDING_SESSION_SUCCESS, payload: res.response })
		} catch (e) {
			return dispatch({ type: SESSION_FAIL, payload: e })
		}
	}
};

