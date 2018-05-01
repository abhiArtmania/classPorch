import React, {Component} from 'react';
import {NotificationsSection, StatsSection, WeekScheduleSection} from './sections';
import {connect} from 'react-redux';
import {Notification} from 'react-notification';
import {history} from '../../redux/store';
import {getDashboard, getUnreadMessagesCount,profileRequested} from '../../redux/actions';

class DashboardTutor extends Component {

  state = {
    isNotificationActive: false,
    unreadMessageCount: 0
  };
  componentWillMount() {
    const {userId, authToken} = this.props;
    
   
      this.props.profileRequested(userId,authToken);
     
  }
  
  componentDidMount() {
    const {userId, authToken,presentProfileId} = this.props;
    this.props.getDashboard({userId, authToken});
    this.props.profileRequested(userId,authToken);
    this.props.getUnreadMessagesCount();
   if(!this.props.profile.verified){
   
      this.props.profileRequested(userId,authToken);
     
     }
  }

  componentWillReceiveProps(nextProps) {
    const {userId, authToken, unreadMessageCount} = this.props;

    if (this.props.sessionRequestIndicator !== nextProps.sessionRequestIndicator) {
      this.setState({isNotificationActive: true});
      this.props.getDashboard({userId, authToken})
    }

    this.setState({unreadMessageCount: unreadMessageCount});
  }

  dismissNotification = () => {
    this.setState({isNotificationActive: false})
  };

  render() {
    const {unreadMessageCount, profile} = this.state;
    console.log(profile);
    return (
      <div>
        <StatsSection />
        
       
        
      </div>
    );
  }
}

const mapStateToProps = ({auth,profileState, dashboard}) => {
  console.log(profileState);
  const {id: userId, authToken} = auth;
  const {sessionRequestIndicator, displayMessage  } = dashboard;
  const {presentProfileId, educationalAttributes, averageRating, 
		reviews, mode,profile } = profileState;
  return {userId, authToken, profile, sessionRequestIndicator, displayMessage,presentProfileId, educationalAttributes, averageRating, 
		reviews, mode }
};

const mapActionsToProps = () => {
  return {getDashboard, getUnreadMessagesCount,profileRequested}
};

export default connect(mapStateToProps, mapActionsToProps())(DashboardTutor);

