
import {
  
  SESSION_SUCCESS,
  SESSION_FAIL,
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
    
    case SESSION_SUCCESS:
      console.log('test');
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
    case SESSION_FAIL:
      return { ...state, loadingSearch:false, searchError:action.payload };
    
    default:
      return state
  }
}