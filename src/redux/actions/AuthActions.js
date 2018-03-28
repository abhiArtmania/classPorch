import {apiEndpoints} from '../../ApiEndpoints';
import {history} from '../../redux/store';
import axios from 'axios'
import {deleteState} from '../localStorage';

import {
    STATE_PERSISTED,
    EMAIL_CHANGED,
    EMAIL_SUBMITTED,
    PASSWORD_CHANGED,
    CLOSE_PASSWORD_DIALOG,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    SIGNUP_USER,
    SIGNUP_SUCCESS,
    INITIAL_LOGIN,
    SIGNUP_FAIL,
    LOGOUT_USER_SUCCESS
} from './types'
export const initialLogin = () => {
    return {
        type: INITIAL_LOGIN
    };
};
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const emailSubmitted = (boolValue) => {
    return {
        type: EMAIL_SUBMITTED,
        payload: boolValue
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
};

export const passwordDialogClosed = (boolValue) => {
    return {
        type: CLOSE_PASSWORD_DIALOG,
        payload: boolValue
    }
};

export const statePersisted = () => {
    return {
        type: STATE_PERSISTED
    }
};

export const loginUser = (userReqObject) => {
	
    return async (dispatch) => {
        try {
            dispatch({type: LOGIN_USER});

            const res = await axios.post(apiEndpoints.auth.signIn, userReqObject);
<<<<<<< HEAD
          
=======
            console.log(res);
            console.log(res.data.response);
            
>>>>>>> origin/profile-page
            if (res.status !== 200) {
                throw('Please check your internet connection. A mouse may be chewing the wire.')
            }

<<<<<<< HEAD
            if (res.data.meta.code!==201) {
                throw('The email or password you entered is incorrect, please try again')
            }
            console.log(res.data.response)

            const userResObject = res.data.response;
=======
           /* if (!res.data.success) {
                throw('Please enter correct username or password. We know you can do it. ')
            }*/

            const userResObject = {...res.data.response};
            console.log(userResObject);
>>>>>>> origin/profile-page
            dispatch({type: LOGIN_USER_SUCCESS, payload: {userResObject}});
            history.isAuth = true;
            history.push('/dashboard/' + res.data.response.role)

        } catch (e) {
         
            dispatch({type: LOGIN_USER_FAIL, payload: {errorMessage: e}});
            return history.push('/login')
        }
    }
};


export const signupUser = (parsedForm) => {
    console.log(parsedForm);
    console.log(JSON.stringify(parsedForm, null, 4));
    return async (dispatch) => {
      
            dispatch({type: SIGNUP_USER});
            let config={};
		//if(arguments[1]==="tutor")
		 config={
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
          axios.post(apiEndpoints.auth.signUp, parsedForm).then(res => {
           
            
            if (res.status !== 200) {
                throw('Please check your internet connection. A mouse may be chewing the wire.')
            }
          

           if (res.data.meta.code!==201) {
			   
			   const err=(res.data.response.error)? res.data.response.error : "error"
                throw(err)
            }

<<<<<<< HEAD
            const userResObject = res.data.response;
            
           const role=res.data.response.role;
            

            if (role == 'tutor') {
=======
            const userResObject = {...res.data.user, ...res.data.session};
            console.log(userResObject);
            if (res.data.user.role === 'tutor') {
>>>>>>> origin/profile-page
                dispatch({type: SIGNUP_SUCCESS, payload: {userResObject}});
                 history.isAuth = true;
                return history.push('/dashboard/tutor')
            } else if (role == 'student') {
				 history.isAuth = true;
                dispatch({type: SIGNUP_SUCCESS, payload: {userResObject}});
               return history.push('/dashboard/student');
            } else {
				
                throw(res.error)

            }
        }).catch((e) => {
			
            return dispatch({type: SIGNUP_FAIL, payload: {errorMessage: e}})
        })
    }
};

export const logoutUserRequested = () => {
    deleteState();
    return {
        type: LOGOUT_USER_SUCCESS,
        payload: ''
    }
};
