import {
	EMAIL_CHANGED,
	EMAIL_SUBMITTED,
	PASSWORD_CHANGED,
	CLOSE_PASSWORD_DIALOG,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	SIGNUP_USER,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	INITIAL_LOGIN,
	LOGOUT_USER_SUCCESS,
	UPDATE_PERSONAL_INFO,
	UPDATE_PERSONAL_INFO_SUCCESS,
	UPDATE_PERSONAL_INFO_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
	email: '',
	fullname: '',
	password: '',
	showPasswordModal: false,
	userObject: {},
	errorMessage: '',
	loading: false,
	loggedIn: false,
	personalInfoUpdating: false,
	personalInfoUpdated: false,
	authToken: '',
	birthdayDate: '',
	city: '',
	country: '',
	createdAt: '',
	firstName: '',
	educations: {},
	skills: [],
	gender: '',
	id: '',
	image: '',
	lastName: '',
	number: '',
	provider: '',
	role: '',
	uid: '',
	updatedAt: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case INITIAL_LOGIN:
			return { ...state, errorMessage: "" };

		case EMAIL_CHANGED:
			return { ...state, email: action.payload };

		case EMAIL_SUBMITTED:
			return { ...state, showPasswordModal: action.payload, errorMessage: null };

		case PASSWORD_CHANGED:
			return { ...state, password: action.payload };

		case CLOSE_PASSWORD_DIALOG:
			return { ...state, showPasswordModal: action.payload };

		case LOGIN_USER:
			return { ...state, loading: true, errorObject: {}, errorMessage: null };

		case LOGIN_USER_SUCCESS: {
			const { auth_token, birthday_date, city, country, created_at, email,
				first_name, gender, id, image, last_name, number, educations, skills, provider, role, uid, fullname, updated_at } = action.payload.userResObject;

			return {
				...state = INITIAL_STATE, loggedIn: true, authToken: auth_token, skills, birthdayDate: birthday_date, city, country,
				createdAt: created_at, educations, email, firstName: first_name, gender, id, image, lastName: last_name, number, fullname: fullname,
				provider, role, uid, updatedAt: updated_at, errorMessage: null
			}
		}

		case LOGIN_USER_FAIL:
			// const { errorObject, user } = action.payload
			return { ...state = INITIAL_STATE, errorMessage: action.payload.errorMessage };

		case SIGNUP_USER:
			return { ...state = INITIAL_STATE, loading: true };

		case SIGNUP_SUCCESS: {

			const { auth_token, birthday_date, city, country, created_at, email,
				first_name, gender, id, image, last_name, number, provider, role, uid, updated_at } = action.payload.userResObject;


			return {
				...state = INITIAL_STATE, loggedIn: true, authToken: auth_token, city, country,
				createdAt: created_at, email, firstName: first_name, gender, id, image, lastName: last_name, number,
				provider, role, uid, updatedAt: updated_at, errorMessage: null
			}
		}

		case SIGNUP_FAIL:
			return { ...state = INITIAL_STATE, errorMessage: action.payload.errorMessage };

		case LOGOUT_USER_SUCCESS:
			return { ...state = INITIAL_STATE, errorMessage: null };
		case UPDATE_PERSONAL_INFO:
			return { ...state, personalInfoUpdating: true };
		case UPDATE_PERSONAL_INFO_SUCCESS:
			return { ...state, personalInfoUpdating: false, personalInfoUpdated: true };
		case UPDATE_PERSONAL_INFO_ERROR:
			return { ...state, errorMessage: action.payload.errorMessage, personalInfoUpdating: false, personalInfoUpdated: false };
		default:
			return state;
	}
}
