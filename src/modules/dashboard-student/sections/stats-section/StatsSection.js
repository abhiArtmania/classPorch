import React from 'react';
import {history} from '../../../../redux/store';
import {Grid, Image, Tab } from 'semantic-ui-react';
import './styles.css';
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


        <Grid.Row centered>
          <Grid.Column width={12} textAlign='left'>
            <p className='tutor-greeting'> Hi {profile['fullname']}  </p>
            <span className='tutor-greeting2'>Here is your tailored dashboard.</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row/>
        <Grid.Row centered style={{cursor: 'pointer'}} onClick={this.onChatsViewed}>
          <Grid.Column width={12} textAlign='left'>
            <Image src={ unreadMessageCount ? messageIconUnread : messageIcon} size='mini' verticalAlign='middle'/>
            <span className='dashboard-message-text'> {unreadMessageCount ? unreadMessageCount : 0} new messages</span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row/>
        <Grid.Row/>
        <Grid.Row centered>
          <Grid.Column width={3}>
            <a className='dashboard-stats-container'>
              <p className='dashboard-stats-text'>
                {profile['sessions-done-count']} <br/>
                <Link to="/completed-sessions">Completed <br/> Sessions</Link>
                
              </p>
            </a>
          </Grid.Column>
          <Grid.Column width={3}>
            <a className='dashboard-stats-container'>
              <p className='dashboard-stats-text'>
                {profile['scheduled-sessions-count']} <br/>
                <Link to="/scheduled-sessions">Scheduled <br/> Sessions</Link>
              
              </p>
            </a>
          </Grid.Column>
          <Grid.Column width={3}>
            <a className='dashboard-stats-container'>
              <p className='dashboard-stats-text'>
                {profile['requested-sessions-count']} <br/>
                Requested <br/>
                Sessions
              </p>
            </a>


          </Grid.Column>
         
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = ({dashboard}) => {
  return {dashboard}
};


export default connect(mapStateToProps, {})(StatsSection);
