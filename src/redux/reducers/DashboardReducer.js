import {
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
  LOGOUT_USER_SUCCESS,
  ADD_MONEY_START,
  ADD_MONEY_SUCCESS,
  ADD_MONEY_FAIL,
  REQUEST_MONEY_START,
  REQUEST_MONEY_SUCCESS,
  REQUEST_MONEY_FAILED,
  REQUEST_ACCOUNT_LINK_START,
  REQUEST_ACCOUNT_LINK_SUCCESS,
  REQUEST_ACCOUNT_LINK_FAILED,
  SET_UNREAD_MESSAGES_COUNT,
  SET_FAQ_SUBJ,
} from '../actions/types';


// normalize the state to avoid undefined errors 
const INITIAL_STATE = {
  type: "",
  profile: {
    "fullname": "",
    "profile-picture": "",
    "type": "",
    "credits": "",
    "sessions-done-count": 0,
    "requested-sessions-count": 0,
    "scheduled-sessions-count": 0,
    "unread-messages-count": 0
  },
  notifications: [],
  notificationsNextUrl: null,
  suggestedTutors: null,
  weekSchedule: [],
  dashboardErrors: '',
  loading: false,
  sessionRequestIndicator: null,
  displayMessage: '',
  // amountToBeAdded:'',
  // stripeToken:'',
  amountAddedIndicator: '',
  addingMoney: false,
  requestMoneyIndicator: null,
  requestingMoney: false,
  accountLinkIndicator: null,
  linkingAccount: false,
  unreadMessageCount: 0,
  searchMode:'normal',
  FAQ:[],
  FAQSubj:''
};

export default (state = INITIAL_STATE, action) => {
console.log(action.type)
  switch (action.type) {
	case   GET_DASHBOARD_START:
		return {...state, loading: true};
	  
    case GET_DASHBOARD_SUCCESS: {
      const {profile, notifications, notificationsNextUrl, suggestedTutors, weekSchedule, nextWeekUrl} = action.payload;
      return {...state, profile, notifications, notificationsNextUrl, suggestedTutors, weekSchedule, nextWeekUrl, loading: false}
    }

    case GET_DASHBOARD_FAIL:
      return {...state, dashboardErrors: action.payload, loading: false};

    case FETCH_NOTIFICATIONS:
      // console.log(action.payload)
      return {...state, loading: true};

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {...state, loading: false, notifications: [...action.payload.attributes.notifications]};

    case FETCH_NOTIFICATIONS_FAIL: {
      return {...state, loading: false, dashboardErrors: action.payload}
    }

    case TUTOR_SESSION_REQUESTED: {
		
      return {...state }
    }

    case TUTOR_SESSION_REQUEST_SENT: {
      const {sessionRequestIndicator, message} = action.payload;
      return {...state, sessionRequestIndicator, displayMessage: message}
    }
    case TUTOR_SESSION_REQUEST_FAILED: {
      const {sessionRequestIndicator, message} = action.payload;
      return {...state, sessionRequestIndicator, displayMessage: message}
    }

    case SESSION_ACCEPT_START:
      return {...state};

    case SESSION_ACCEPT_SUCCESS: {
      const {sessionRequestIndicator, message} = action.payload;
      return {...state, sessionRequestIndicator, displayMessage: message}
    }

    case SESSION_ACCEPT_FAIL: {
      const {sessionRequestIndicator, message} = action.payload;
      return {...state, sessionRequestIndicator, displayMessage: message}
    }

    case SESSION_REJECT_START:
      return {...state};

    case SESSION_REJECT_SUCCESS: {
      const {sessionRequestIndicator, message} = action.payload;
      return {...state, sessionRequestIndicator, displayMessage: message}
    }

    case SESSION_REJECT_FAIL: {
      const {sessionRequestIndicator, message} = action.payload;
      return {...state, sessionRequestIndicator, displayMessage: message}
    }
    // case ADD_PAYMENT_FIELDS:{
    //     const { amountToBeAdded, stripeToken }
    //     return { ...state, amountToBeAdded, stripeToken }
    // }

    case ADD_MONEY_START: {
      return {...state, addingMoney: true}
    }

    case ADD_MONEY_SUCCESS: {
      const {moneyAddedIndicator, message} = action.payload;
      return {...state, moneyAddedIndicator, displayMessage: message, addingMoney: false}
    }

    case ADD_MONEY_FAIL: {
      const {moneyAddedIndicator, message} = action.payload;
      return {...state, moneyAddedIndicator, displayMessage: message, addingMoney: false}
    }

    case LOGOUT_USER_SUCCESS:
      return {...state = INITIAL_STATE};

    case REQUEST_MONEY_START: {
      return {...state, requestingMoney: true}
    }

    case REQUEST_MONEY_SUCCESS: {
      const {requestMoneyIndicator, message} = action.payload;
      return {...state, requestMoneyIndicator, displayMessage: message, requestingMoney: false}
    }

    case REQUEST_MONEY_FAILED: {
      const {requestMoneyIndicator, message} = action.payload;
      return {...state, requestMoneyIndicator, displayMessage: message, requestingMoney: false}
    }

    case REQUEST_ACCOUNT_LINK_START: {
      return {...state, linkingAccount: true}
    }

    case REQUEST_ACCOUNT_LINK_SUCCESS: {
      const {accountLinkIndicator, message} = action.payload;
      return {...state, accountLinkIndicator, displayMessage: message, linkingAccount: false}
    }

    case REQUEST_ACCOUNT_LINK_FAILED: {
      const {accountLinkIndicator, message} = action.payload;
      return {...state, accountLinkIndicator, displayMessage: message, linkingAccount: false}
    }

    case SET_UNREAD_MESSAGES_COUNT:
      return {
        ...state,
        unreadMessageCount: action.count
      }
    case   GET_FAQ_START:{
    
		return {...state, loading: true}
	  }
    case GET_FAQ_SUCCESS: {
      const FAQ = action.payload;
      
      return {...state, FAQ:FAQ,loading: false}
    }

    case GET_FAQ_FAIL:
      return {...state, dashboardErrors: action.payload, loading: false}
      case SET_FAQ_SUBJ:{
	
      return {...state,  FAQSubj: action.subj}
}

    default:
      return state
  }
}
