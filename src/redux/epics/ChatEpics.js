import {ChatActions} from '../actions';
import {verifyFirebaseAuth} from '../services';
import Rx from 'rxjs/Rx';

export const loadChats = (action$, state, {auth, firestore}) => action$.ofType(ChatActions.LOAD_CHATS)
  .mergeMap(() => {
    const currentState = state.getState().auth;
    
    return verifyFirebaseAuth({auth}).switchMap(() => {
      return Rx.Observable.create(observer => {
        console.log("CHAT EPICS currentState:",currentState);
        let stT_id = currentState.role === 'student' ? 'student.id' : 'tutor.id';
        
        firestore.collection('chats')
          // .where( currentState.role === 'student' ? 'student.id' : 'tutor.id', '==', currentState.id) old
          // .where("student.id", "==", currentState.id) perfect
          .where(stT_id, "==", currentState.id)

          .orderBy('lastMessageCreatedAt', 'desc')
          .onSnapshot(snapshot => {
            observer.next(snapshot);
          }, (error) => {
            observer.error(error);
          });
        });
    })
    .map(snapshot => {
      return snapshot.docs.map(doc => {
        return {
          key: doc.id,
          user: currentState.role === 'tutor' ? doc.data().student : doc.data().tutor,
          updatedAt: doc.data().lastMessageCreatedAt,
          lastMessage: doc.data().lastMessage
        };
      });
    })
    .map(dataSource => ChatActions.chatsLoaded(dataSource))
    .takeUntil(action$.ofType(ChatActions.UNSUBSCRIBE_CHATS))
    .catch(error => Rx.Observable.of(ChatActions.showError(error.message)));
  });
