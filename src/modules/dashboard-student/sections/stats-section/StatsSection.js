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

class StatsSection extends React.Component {

  constructor(props) {
    super(props);
    this.onChatsViewed = this.onChatsViewed.bind(this);
  }

  onChatsViewed = () => {
    history.push('/chats');
  };

  render() {
   
    const {profile, unreadMessageCount} = this.props.dashboard;
    const panes = [
    { menuItem: 'Completed Sessions (8)', render: () => <Tab.Pane attached={false}>{<CompletedSession/>}</Tab.Pane> },
      { menuItem: 'Scheduled Sessions (6)', render: () => <Tab.Pane attached={false}>{<ScheduledSession/>}</Tab.Pane> },
    { menuItem: 'Pending Sessions (5)', render: () => <Tab.Pane attached={false}>{<PendingSession/>}</Tab.Pane> },
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

const mapStateToProps = ({dashboard}) => {
  return {dashboard}
};


export default connect(mapStateToProps, {sessionRequested})(StatsSection);