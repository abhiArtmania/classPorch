
import {
  
  SESSION_SUCCESS,
  SESSION_FAIL,
}  from '../actions/types'

const INITIAL_STATE = {
  page_no:'' ,
  session_requests: [],
  status: '',
  total_records: '',
 
};


export default (state=INITIAL_STATE, action) => {
  switch(action.type){
    
    case SESSION_SUCCESS:
     console.log('dsfsdf');
      const  { page_no ,  session_requests,   status,  total_records }= action.payload;
      return { ...state, page_no ,  session_requests,   status,  total_records };
        
      
    case SESSION_FAIL:
      return { ...state, loadingSearch:false, searchError:action.payload };
    
    default:
      return state
  }
}