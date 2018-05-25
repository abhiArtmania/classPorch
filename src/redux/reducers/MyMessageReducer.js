
import {
    GET_RESTRICTIONS
} from '../actions/types'

const INITIAL_STATE = {
    RESTRICT: false,
};

export default (state=INITIAL_STATE,action) => {
    
    switch(action.type){
        case GET_RESTRICTIONS:
            return { ...state, RESTRICT:action.payload };

            default:
            return state
    }
}

