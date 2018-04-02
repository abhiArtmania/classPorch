
import {
  SEARCH_START,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  LOGOUT_USER_SUCCESS,
  TOGGLE_SEARCH_MODE
  
}  from '../actions/types'

const INITIAL_STATE = {
  searchResults: [],
  loadingSearch: false,
  searchError: null,
  searchMode: 'normal',
  metadata: {}
};

export default (state=INITIAL_STATE, action) => {
  switch(action.type){
    case SEARCH_START:
      return { ...state, loadingSearch: true };
    case SEARCH_SUCCESS:
      return {
        ...state,
        loadingSearch: false,
        searchResults: action.payload.users,
        metadata: {
          gender: action.payload.gender,
          page_no: action.payload.page_no,
          per_page: action.payload.per_page,
          q: action.payload.q,
          total_count: action.payload.total_count,
          type: action.payload.type
        }
      };
    case SEARCH_FAIL:
      return { ...state, loadingSearch:false, searchError:action.payload };
    case LOGOUT_USER_SUCCESS:
      return { ...state = INITIAL_STATE };
    case TOGGLE_SEARCH_MODE:
      return { ...state, searchMode:action.payload };
    default:
      return state
  }
}