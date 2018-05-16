import {
    SEND_MESSAGE
  } from '../actions/types';

  const INITIAL_STATE = {
    MESSAGES: [],
  };


  export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
    //   case GET_BOOKED_TUTOR: {
    //     const   TUTORINFO = action.payload;
        
    //     return {...state,   TUTORINFO:  TUTORINFO,loading: false}
    //   }
    //   case SUBMIT_SESSION: {
    //     const   BOOKEDSESSION = action.payload;
        
    //     return {...state,   BOOKEDSESSION:  BOOKEDSESSION,loading: false}
    //   }

      case SEND_MESSAGE: {
        const MESSAGES = action.payload;
        
        return {...state,   MESSAGES: MESSAGES}
      }

      default:
        return state
    }
  }