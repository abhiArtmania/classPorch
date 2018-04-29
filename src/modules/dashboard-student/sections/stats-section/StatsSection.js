import React from 'react';
import {history} from '../../../../redux/store';
import {Grid, Image, Tab } from 'semantic-ui-react';
import './styles.css';

import {  sessionRequested } from '../../../../redux/actions';
import {messageIcon, messageIconUnread} from '../../../../assets/dashboard';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {CompletedSession} from "./CompletedSession";
import {PendingSession} from "./PendingSession";
import {ScheduledSession} from "./ScheduledSession";
import {
  scheduledSession,pendingSession,completedSession
 
} from '../../../../redux/actions';
class StatsSection extends React.Component {

  constructor(props) {
    super(props);
    this.onChatsViewed = this.onChatsViewed.bind(this);
  }

  onChatsViewed = () => {
    history.push('/chats');
  };
  componentWillMount() {
       const page_no = 1;
    const params = {
        page_no,
    };
   
    console.log(params);
    this.props.scheduledSession(params);
    this.props.pendingSession(params);
    this.props.completedSession(params);
   
}
  render() {
   
    const {session_pending, session_scheduled, session_completed } = this.props
    console.log(this.props.session_pending);
    const CompleteSessionCount='';
    const panes = [
    { menuItem: `Completed Sessions(${session_completed.total_records})`, render: () => <Tab.Pane attached={false}>{<CompletedSession CompleteSessionCount={CompleteSessionCount}/>}</Tab.Pane> },
      { menuItem:`Scheduled Sessions(${session_scheduled.total_records})`, render: () => <Tab.Pane attached={false}>{<ScheduledSession/>}</Tab.Pane> },
    { menuItem: `Pending Sessions(${session_pending.total_records})`, render: () => <Tab.Pane attached={false}>{<PendingSession/>}</Tab.Pane> },
    ]
    
    return (
      <Grid className='tutor-stats-section'>
        <Grid.Row width={15} >
          <Grid.Column width={12} style={{margin:'0 auto'}}>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
          </Grid.Column>
         
        </Grid.Row>
      </Grid>
    );
  }
}



const mapStateToProps = store => {
  console.log(store)
  const {id: userId, authToken} = store.auth;
  const {sessionRequestIndicator, displayMessage, unreadMessageCount,profile} = store.dashboard;
  const {searchMode, searchResults, loadingSearch} = store.search;
  const {session_scheduled,session_pending,session_completed }=store.SessionReducer;
  return {
    userId,
    authToken,
    profile,
    sessionRequestIndicator,
    displayMessage,
    unreadMessageCount,
    searchMode,
    searchResults,
    loadingSearch,
    searchMetadata: store.search.metadata,
    session_scheduled,
    session_pending,
    session_completed
  }
};

const mapActionsToProps = () => {
  return { 
    scheduledSession,
    pendingSession,
    completedSession}
};

export default connect(mapStateToProps, mapActionsToProps())(StatsSection);
