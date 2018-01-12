import { apiEndpoints } from '../../ApiEndpoints';
import {
    SEARCH_START,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    REQUEST_PROFILE_START,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    TOGGLE_SEARCH_MODE
} from './types'

export const searchRequested = (searchWord,authToken) => {
    return async(dispatch) => {
        try{
            dispatch({ type: SEARCH_START})

            let rawRes = await fetch(`${apiEndpoints.base}/search?type=tutors&&q=${searchWord}`,{
                headers:{
                    'auth-token':authToken
                }
            })
            let res = await rawRes.json()
            return dispatch({ type:SEARCH_SUCCESS, payload:res.results })
        } catch(e) {
            console.log(e)
            return dispatch({ type:SEARCH_FAIL,payload:e })
        }  
    }
}


export const toggleSearchMode = (mode) => {
    return {
      type:TOGGLE_SEARCH_MODE,
      payload: mode
    }
}

// export const redirectToProfile = ({ userId, authToken }) => {
//     return async(dispatch) => {
//         try{
//             dispatch({ type:REQUEST_PROFILE_START })

//             let resRaw = await fetch(`${apiEndpoints.base}/user/${userId}/profile`,{
//                 headers:{
//                     'auth_token':authToken
//                 }
//             })
            


//         } catch(e) {
//             console.log(e)

//         }
//     }
// }
