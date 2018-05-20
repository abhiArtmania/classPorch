import {apiEndpoints} from '../../ApiEndpoints';
import {browserHistory} from 'react-router';
import {history} from '../../redux/store';

import {
  GET_UNREAD_MESSAGES_COUNT,
  SET_UNREAD_MESSAGES_COUNT,
  GET_DASHBOARD_START,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_FAIL,
  GET_FAQ_START,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  TUTOR_SESSION_REQUESTED,
  TUTOR_SESSION_REQUEST_SENT,
  TUTOR_SESSION_REQUEST_FAILED,
  SESSION_ACCEPT_START,
  SESSION_ACCEPT_SUCCESS,
  SESSION_ACCEPT_FAIL,
  SESSION_REJECT_START,
  SESSION_REJECT_SUCCESS,
  SESSION_REJECT_FAIL,
  ADD_MONEY_START,
  ADD_MONEY_SUCCESS,
  ADD_MONEY_FAIL,
  REQUEST_MONEY_START,
  REQUEST_MONEY_SUCCESS,
  REQUEST_MONEY_FAILED,
  REQUEST_ACCOUNT_LINK_START,
  REQUEST_ACCOUNT_LINK_SUCCESS,
  REQUEST_ACCOUNT_LINK_FAILED,
  SET_FAQ_SUBJ,
  GET_STUDENT_FAQ_SUCCESS,
  GET_TUTOR_FAQ_SUCCESS,
  GET_TECHNICAL_FAQ_SUCCESS,
  GET_SEARCH_FAQ_SUCCESS,
  SET_SEARCH_FAQ,
  GET_CATEGORIES,
  SUBMIT_TICKET_SUCCESS,
  SUBMIT_REVIEW,
  SUBMIT_TUTOR_REVIEW,
  GET_AVAILABILITY,
  GET_BOOKED_TUTOR,
  SUBMIT_SESSION,

  UNSUBSCRIBE_DASHBOARD,
  GET_PROFILE_SUCCESS} from './types';

const uuidv1 = require('uuid/v1');


export const getUnreadMessagesCount = () => ({
  type: GET_UNREAD_MESSAGES_COUNT
});

export const setUnreadMessagesCount = (count) => ({
  type: SET_UNREAD_MESSAGES_COUNT,
  count
});

export const unsubscribeDashboard = () => ({
  type: UNSUBSCRIBE_DASHBOARD
});

export const getDashboard = ({userId, authToken}) => {
	
  return (dispatch) => {
	  dispatch({type: GET_DASHBOARD_START, payload: true});
    fetch(`${apiEndpoints.base}/user/${userId}/dashboard`, {
      headers: {
        'auth-token': authToken
      }
    })
      .then(raw => {
        if (raw.status !== 200) {
          throw('Request failed. Please try again.')
        }
        return raw.json()
      })
      .then(res => {
		   
        console.log(res);
        const {notifications} = res.response;
        const profile=res.response.user; 
               const suggestedTutors = res.response['suggested_tutors'];
        const notificationsNextUrl = ''//res.data.attributes['notifications-next-url'];

        const weekSchedule = res.response['next_week_url'];
        const nextWeekUrl = '';
        
        return dispatch({
          type: GET_DASHBOARD_SUCCESS,
          payload: {profile, notifications, notificationsNextUrl, suggestedTutors, weekSchedule, nextWeekUrl}
        })
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: GET_DASHBOARD_FAIL,
          payload: err
        })
      })
  }
};

export const fetchNotifications = (uri, authToken, userId) => {
	  
	  
  console.log(authToken);
  console.log(userId);
  return (dispatch) => {
    dispatch({type: FETCH_NOTIFICATIONS, payload: true});

    fetch(`${apiEndpoints.base}/user/${userId}/dashboard`, {
      headers: {
        'auth-token': authToken
      }
    })
      .then(raw => {
        console.log(raw);
        if (raw.status !== 200) {
          throw('Request failed. Please try again.')
        }
        return raw.json()
      })
      .then(res => {
		  
      
        return dispatch({type: FETCH_NOTIFICATIONS_SUCCESS, payload: res.data})
      })
      .catch(err => {
        return dispatch({type: FETCH_NOTIFICATIONS_FAIL, payload: 'error extra'})
      })
  }
};
export const getFAQ = (cat) => {

  return (dispatch) => {
	  
    dispatch({type: GET_FAQ_START, payload: true});
    console.log(cat);
    let catApi = 'faq?q='+cat
    // if(cat === 'faq') {catApi = 'faq'}
    // let catApi = '/faq'
    if(cat === 'ParentTeacher'){catApi = 'faq?category=student&q=How'}
    else if(cat === 'Tutor'){catApi = 'faq?category=tutor&q=How'}
    else if(cat === 'Technical'){catApi = 'faq?category=tech_support&q=How'}
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200")
      console.log("res for faq api",res); 
        return dispatch({type: GET_FAQ_SUCCESS, payload: res.response})
      })
      .catch(err => {
        return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      })
  }
};







export const getStudentFAQ = () => {

  return (dispatch) => {
	  
    dispatch({type: GET_FAQ_START, payload: true});
    let catApi = 'faq?category=student&q=How'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200")
      console.log("res for Studentfaq api",res); 
        return dispatch({type: GET_STUDENT_FAQ_SUCCESS, payload: res.response})
      })
      .catch(err => {
        return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      })
  }
};

export const getTutorsFAQ = () => {

  return (dispatch) => {
	  
    dispatch({type: GET_FAQ_START, payload: true});
    let catApi = 'faq?category=tutor&q=How'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200")
      console.log("res for Tutorfaq api",res); 
        return dispatch({type: GET_TUTOR_FAQ_SUCCESS, payload: res.response})
      })
      .catch(err => {
        return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      })
  }
};



export const getTechnicalFAQ = () => {

  return (dispatch) => {
	  
    dispatch({type: GET_FAQ_START, payload: true});
    let catApi = 'faq?category=tech_support&q=How'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200")
      console.log("res for Techfaq api",res); 
        return dispatch({type: GET_TECHNICAL_FAQ_SUCCESS, payload: res.response})
      })
      .catch(err => {
        return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      })
  }
};


export const setSearchFAQ = (result) => {

  return (dispatch) => {
    dispatch({type: GET_FAQ_START, payload: true});
     return dispatch({type: SET_SEARCH_FAQ, payload: result})
  }
};




export const getCategories = () => {

  return (dispatch) => {

    let catApi = 'ticket_categories'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200")
      console.log("res for categories api",res); 
        return dispatch({type: GET_CATEGORIES, payload: res.response})
      })
      .catch(err => {
        return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      })
  }
};

export const getAvailability = (id) => {

  return (dispatch) => {

    let catApi = 'tutor_schedules?tutor_id='+id
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200")
      console.log("res for availability api",res); 
        return dispatch({type: GET_AVAILABILITY, payload: res.response})
      })
      .catch(err => {
        return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      })
  }
};



export const submitTicket = (contact_ticket) => {

  return (dispatch) => {

    let catApi = 'contact_tickets'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                method: 'POST',
                body: JSON.stringify(contact_ticket),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'multipart/form-data',
                  'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                })
                
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{
      console.log("res for contact ticket api",JSON.stringify(res.response)); 
        return dispatch({type: SUBMIT_TICKET_SUCCESS, payload: res.response})
      })
      // .catch(err => {
      //   return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      // })
  }
};


export const submitReview = (submitReview) => {

  return (dispatch) => {

    let catApi = 'reviews'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                method: 'POST',
                body: JSON.stringify(submitReview),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'multipart/form-data',
                  'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                })
                
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{
      console.log("res for review api",JSON.stringify(res.response)); 
        return dispatch({type: SUBMIT_REVIEW, payload: res.response})
      })
      // .catch(err => {
      //   return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      // })
  }
};

export const bookedTutor = (tutorInfo) => {
console.log(tutorInfo);
  return (dispatch) => {
    // dispatch({type: GET_BOOKED_TUTOR, payload: true});
     return dispatch({type: GET_BOOKED_TUTOR, payload: tutorInfo})
  }
};



export const sessionRequest = (booked_tutor) => {

  return (dispatch) => {

    let catApi = 'session_requests'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                method: 'POST',
                body: JSON.stringify(booked_tutor),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'multipart/form-data',
                  'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                })
                
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{
      console.log("res for contact ticket api",JSON.stringify(res.response)); 
        return dispatch({type: SUBMIT_SESSION, payload: res.response})
      })
      // .catch(err => {
      //   return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      // })
  }
};
// export const sessionRequest = (booked_tutor) => {


// console.log(JSON.stringify(booked_tutor));


//   return (dispatch) => {
// console.log("ye jayegi",booked_tutor)
//     let catApi = 'session_requests'
//     console.log(`${apiEndpoints.base}/${catApi}`);
// 	  fetch(`${apiEndpoints.base}/${catApi}`, {
//                 method: 'POST',
//                 Body: JSON.stringify(booked_tutor),
//                 headers: new Headers({
//                   'Content-Type': 'application/json',
//                   // 'Content-Type': 'multipart/form-data',
//                   'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
//                 })
                
//             })
// 	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
// 	.then(res =>{
//       console.log("res for session requested api",JSON.stringify(res.response)); 
//         return dispatch({type: SUBMIT_SESSION, payload: res.response})
//       })
//       .catch(err => {
//         console.log(err)
//         // return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
//       })
//   }
// };



export const submitTutorReview = (submitReview) => {

  return (dispatch) => {

    let catApi = 'reviews'
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                method: 'POST',
                body: JSON.stringify(submitReview),
                headers: new Headers({
                  'Content-Type': 'application/json',
                  // 'Content-Type': 'multipart/form-data',
                  'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                })
                
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{
      console.log("res for review api",JSON.stringify(res.response)); 
        return dispatch({type: SUBMIT_TUTOR_REVIEW, payload: res.response})
      })
      // .catch(err => {
      //   return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      // })
  }
};





// export const submitTicket = () => {
//   var data = {
//     first_name: 'hassaan'
//   }
//   let catApi = 'contact_tickets';
//   fetch(`${apiEndpoints.base}/${catApi}`, {
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify(data), // data can be `string` or {object}!
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
//     })
//   }).then(res => res.json())
//   .catch(error => console.error('Error:', error))
//   .then(response => console.log('Success:', response));
// }



// export const submitTicket = (contact_ticket,form) => {

//   return (dispatch) => {

//     let catApi = 'contact_tickets'
//     console.log(`${apiEndpoints.base}/${catApi}`);
// 	  fetch(`${apiEndpoints.base}/${catApi}`, {
//                 method: 'POST',
//                 body: JSON.stringify(contact_ticket),
//                 headers: new Headers({
//                   'Content-Type': 'application/json',
//                   // 'Content-Type': 'multipart/form-data',
//                   'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
//                 })
                
//             })
// 	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
// 	.then(res =>{
//       console.log("res for submit ticket api",JSON.stringify(res.response)); 
//         return dispatch({type: SUBMIT_TICKET_SUCCESS, payload: res.response})
//       })
//       // .catch(err => {
//       //   return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
//       // })
//   }
// };

// export const submitTicket = () => {
//   var data = {
//     first_name: 'hassaan'
//   }
//   let catApi = 'contact_tickets';
//   fetch(`${apiEndpoints.base}/${catApi}`, {
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify(data), // data can be `string` or {object}!
//     headers: new Headers({
//       'Content-Type': 'application/json',
//       'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
//     })
//   }).then(res => res.json())
//   .catch(error => console.error('Error:', error))
//   .then(response => console.log('Success:', response));
// }





export const getSearchFAQ = (value) => {

  return (dispatch) => {
	  
    dispatch({type: GET_FAQ_START, payload: true});
    let catApi = 'faq?q='+value
    console.log(`${apiEndpoints.base}/${catApi}`);
	  fetch(`${apiEndpoints.base}/${catApi}`, {
                headers: {
                    'auth-token': 'd3FxhQYWG0FIZqn1X1UN_Q'
                }
            })
	.then(rawRes => {console.log("rawRes",rawRes); return rawRes.json()})
	.then(res =>{if(res.meta.code=="200")
      console.log("res for Searchfaq api",res); 
        return dispatch({type: GET_SEARCH_FAQ_SUCCESS, payload: res.response})
      })
      .catch(err => {
        return dispatch({type: GET_FAQ_FAIL, payload: 'error'})
      })
  }
};







export const setFAQSubject = (subj) => ({type:'SET_FAQ_SUBJ',subj});
// export const setFAQCat = (cat) => ({type:'SET_FAQ_CAT',cat});
export const sessionRequested = ({tutorId, skill, authToken, sessionStartTime, sessionEndTime, amountPaid, userId,currentUser, otherUser, messageToClient}) => {
  return async (dispatch) => {
    try {
		
	
       
      dispatch({type: TUTOR_SESSION_REQUESTED});
      dispatch({type:"SET_FIRST_MESSAGE",
        payload: {
          "currentUser": currentUser,
          "otherUser": otherUser
        }
	});
	dispatch({ type: 'SEND_MESSAGE',
			"message":messageToClient,
			"messageType":'TEXT'
			});
      let bodyObject = {
        "tutor_id": tutorId,
        "skill": skill,
        "start_time": sessionStartTime.toString(),
        "end_time": sessionEndTime.toString()
      };
      
      let resRaw = await fetch(`${apiEndpoints.base}/session_requests/request/`, {
        method: "POST",
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject),

      });
      console.log(resRaw.status);
      if (resRaw.status !== 200) {
        // noinspection ExceptionCaughtLocallyJS
          throw('failed request')
      }
      let res = await resRaw.json();
      console.log(res);

      const {id: sessionId, profile} = res;
      const paymentBody = {
        "tutor_id": profile.id,
        "amount": parseFloat(amountPaid),
        "session_id": sessionId
      };
      console.log(paymentBody);
     let payRaw = await fetch(`${apiEndpoints.base}/users/${userId}/pay`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(paymentBody)
      });
      console.log(payRaw.status);
      if (payRaw.status !== 200) {
        throw('failed request')
      }
      let payRes = await payRaw.json();
      console.log(payRes);


      const id = uuidv1();
      return dispatch({
        type: TUTOR_SESSION_REQUEST_SENT,
        payload: {
          sessionRequestIndicator: id,
          message: 'Your session request has been sent'
        }
      })
    } catch (e) {
      alert(e);
      const id = uuidv1();
      return dispatch({
        type: TUTOR_SESSION_REQUEST_FAILED,
        payload: {
          sessionRequestIndicator: id,
          message: 'Oops. Request not sent. Please try again.'
        }
      })
    }
  }
};

export const acceptSession = ({sessionId, authToken}) => {
  return async (dispatch) => {
    try {
      dispatch({type: SESSION_ACCEPT_START});

      let resRaw = await fetch(`${apiEndpoints.base}/session_requests/${sessionId}/accept`, {
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
      });
      if (resRaw.status !== 200) {
        throw('failed request')
      }
      const res = await resRaw.json();
      const id = uuidv1();
      console.log(res.data);
      return dispatch({
        type: SESSION_ACCEPT_SUCCESS,
        payload: {
          sessionRequestIndicator: id,
          message: "You've accepted the session request."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: SESSION_ACCEPT_FAIL,
        payload: {
          sessionRequestIndicator: id,
          message: 'Oops. Request not accepted. Please try again.'
        }
      })
    }
  }
};

export const rejectSession = ({sessionId, authToken}) => {
  return async (dispatch) => {
    try {
      dispatch({type: SESSION_REJECT_START});

      let resRaw = await fetch(`${apiEndpoints.base}/session_requests/${sessionId}/reject`, {
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
      });
      if (resRaw.status !== 200) {
        throw('failed request')
      }
      const res = await resRaw.json();
      const id = uuidv1();
      console.log(res.data);
      return dispatch({
        type: SESSION_REJECT_SUCCESS,
        payload: {
          sessionRequestIndicator: id,
          message: "You've rejected the session request."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: SESSION_REJECT_FAIL,
        payload: {
          sessionRequestIndicator: id,
          message: 'Oops. Request not rejected. Please try again.'
        }
      })
    }
  }
};


// export const addPaymentFields = ({ amountToBeAdded, stripeToken }) => {
//     return {
//         type:ADD_PAYMENT_FIELDS,
//         payload:{
//             amountToBeAdded,
//             stripeToken
//         }
//     }
// }

export const addMoneyToWallet = ({userId, authToken, amountToBeAdded, stripeToken, paymentType}) => {
  return async (dispatch) => {
    try {
      dispatch({type: ADD_MONEY_START});

      let bodyObject = {
        amount: amountToBeAdded,
        stripe_token: stripeToken,
        payment_type: paymentType
      };
      console.log(bodyObject);
      let resRaw = await fetch(`${apiEndpoints.base}/users/${userId}/add_money`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
      });
      if (resRaw.status !== 200) {
        throw('failed request')
      }
      const res = await resRaw.json();
      const id = uuidv1();

      return dispatch({
        type: ADD_MONEY_SUCCESS,
        payload: {
          moneyAddedIndicator: id,
          message: 'Credits have been added to your wallet.'
        }
      })

    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: ADD_MONEY_FAIL,
        payload: {
          moneyAddedIndicator: id,
          message: 'Credits not added. Please try again.'
        }
      })
    }
  }
};

export const requestMoneyAction = ({userId, authToken, availableCredits, enteredCredits}) => {
  return async (dispatch) => {
    try {
      dispatch({type: REQUEST_MONEY_START});

      const id = uuidv1();

      if (availableCredits < enteredCredits) {
        return dispatch({
          type: REQUEST_MONEY_FAILED,
          payload: {
            requestMoneyIndicator: id,
            message: 'Not enough credits'
          }
        })
      }

      let bodyObject = {
        requested_amount: enteredCredits
      };
      let resRaw = await fetch(`${apiEndpoints.base}/users/${userId}/transact`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
      });

      if (resRaw.status !== 200) {
        throw('failed request')
      }
      console.log(resRaw);
      const res = await resRaw.json();
      console.log(res);
      return dispatch({
        type: REQUEST_MONEY_SUCCESS,
        payload: {
          requestMoneyIndicator: id,
          message: "Money has been requested successfully."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: REQUEST_MONEY_FAILED,
        payload: {
          requestMoneyIndicator: id,
          message: 'Oops. Money request failed. Please try again.'
        }
      })
    }
  }
};


export const requestLinkAccount = ({userId, authToken, bankName, ifscCode, accountHolderName, accountNumber}) => {
  return async (dispatch) => {
    try {
      dispatch({type: REQUEST_ACCOUNT_LINK_START});

      const id = uuidv1();

      let bodyObject = {
        "bank_name": bankName,
        "ifsc_code": ifscCode,
        "account_number": accountNumber,
        "account_holder_name": accountHolderName
      };
      // user/56/add_bank_details
      console.log(bodyObject);
      let resRaw = await fetch(`${apiEndpoints.base}/users/${userId}/add_bank_details`, {
        method: 'POST',
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObject)
      });

      if (resRaw.status !== 200) {
        throw('failed request')
      }
      console.log(resRaw);
      const res = await resRaw.json();
      console.log(res);
      return dispatch({
        type: REQUEST_ACCOUNT_LINK_SUCCESS,
        payload: {
          accountLinkIndicator: id,
          message: "Bank account has been linked successfully."
        }
      })
    } catch (e) {
      console.log(e);
      const id = uuidv1();
      return dispatch({
        type: REQUEST_ACCOUNT_LINK_FAILED,
        payload: {
          accountLinkIndicator: id,
          message: 'Oops. Bank account link request failed. Please try again.'
        }
      })
    }
  }
};

