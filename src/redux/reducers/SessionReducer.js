
import {
  
  SESSION_SUCCESS,
  SESSION_FAIL,
}  from '../actions/types'

const INITIAL_STATE = {
  sessionResults: [],
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
       
        sessionResults: action.payload.users,
        
      };
    case SESSION_FAIL:
      return { ...state, loadingSearch:false, searchError:action.payload };
    
    default:
      return state
  }
}