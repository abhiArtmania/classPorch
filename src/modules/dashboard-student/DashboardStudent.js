import React from 'react';
import { array } from 'prop-types';
import {NotificationsSection, StatsSection, SuggestedTutors} from './sections';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react'

import {Notification} from 'react-notification';
import {getDashboard, getUnreadMessagesCount,toggleSearchMode} from '../../redux/actions';
import {SearchResults} from '../search'

class DashboardStudent extends React.Component {

  state = {
    isNotificationActive: false,
    unreadMessageCount: 0
  };

  componentDidMount() {
    const {userId, authToken} = this.props;
    this.props.getDashboard({userId, authToken});
    this.props.getUnreadMessagesCount();
    this.props.toggleSearchMode('normal')
    
  }

  componentWillUnmount(){
    this.props.toggleSearchMode('normal')    
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

  onCancelSearch = () => {
    this.props.toggleSearchMode('normal')
  };


  render() {
    const {unreadMessagesCount} = this.state;
    return (
      <div>
      { 
        this.props.searchMode === 'normal'?
        <div>
          <StatsSection unreadMessagesCount={unreadMessagesCount}/>
          
          <SuggestedTutors/>
          <Notification
            isActive={this.state.isNotificationActive}
            message="Notification"
            action="Dismiss"
            title={this.props.displayMessage}
            dismissAfter={5000}
            onDismiss={this.dismissNotification}
            onClick={this.dismissNotification}
          />
        </div>
        :
        <div>
          <Icon
            name='delete'
            size='large'
            color='red'
            style={{ cursor:'pointer',position:'relative',left:'80%' }} 
            onClick={this.onCancelSearch}
          />
          <SearchResults
            authToken={this.props.authToken}
            loadingSearch={this.props.loadingSearch}
            searchResults={this.props.searchResults}
          />
        </div>
      }
      </div>
    );
  }
}

const mapStateToProps = store => {
  console.log(store)
  const {id: userId, authToken} = store.auth;
  const {sessionRequestIndicator, displayMessage, unreadMessageCount} = store.dashboard;
  const {searchMode, searchResults, loadingSearch} = store.search;
  return {userId, authToken, sessionRequestIndicator, displayMessage, unreadMessageCount, searchMode, searchResults, loadingSearch}
};

DashboardStudent.propTypes = {
  searchResults: array,
}

DashboardStudent.defaultProps = {
  searchResults: [],
}

const mapActionToProps = () => {
  return {getDashboard, getUnreadMessagesCount,toggleSearchMode}
};


export default connect(mapStateToProps, mapActionToProps())(DashboardStudent);

