import {  
    SEND_MESSAGE
  
  } from './types';
// import firebase from 'firebase';
// import {firebaseConfig} from "../../config";

// require('firebase/firestore');
// firebase.initializeApp(firebaseConfig);

// const firestore = firebase.firestore();






export const sendMessage = (msgObj) => {

    // firestore.collection("MyMessages").doc().set(msgObj)
    // .then(function() {
    //     console.log("Document successfully written!");

        return (dispatch) => {
            dispatch({type: SEND_MESSAGE, payload: msgObj});
            //  return dispatch({type: SET_SEARCH_FAQ, payload: result})
          }

    // })
    // .catch(function(error) {
    //     console.error("Error writing document: ", error);
    // });

    
  };
  
