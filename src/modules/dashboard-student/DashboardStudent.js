import React from 'react';
import { array, object, func } from 'prop-types';
import {NotificationsSection, StatsSection, SuggestedTutors} from './sections';
import {connect} from 'react-redux';
import { Icon } from 'semantic-ui-react'

import {Notification} from 'react-notification';
import {
  searchRequested,
  getDashboard,
  getUnreadMessagesCount,
  toggleSearchMode
} from '../../redux/actions';
import {SearchResults} from '../search'

import { Pagination } from "../../components/common";


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

  handleChangePage = pageNumber => e => {
    const { gender, q, type } = this.props.searchMetadata;
    const page_no = pageNumber;
    this.props.searchRequested({ type, q, gender, page_no });
  }

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
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <Pagination
                  searchMetadata={this.props.searchMetadata}
                  onChangePage={this.handleChangePage}
                />
              </div>
            </div>
          </div>
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
  return {
    userId,
    authToken,
    sessionRequestIndicator,
    displayMessage,
    unreadMessageCount,
    searchMode,
    searchResults,
    loadingSearch,
    searchMetadata: store.search.metadata
  }
};

DashboardStudent.propTypes = {
  searchResults: array,
  searchMetadata: object.isRequired,
  searchRequested: func.isRequired,
  getDashboard: func.isRequired,
  getUnreadMessagesCount: func.isRequired,
  toggleSearchMode: func.isRequired,
}

DashboardStudent.defaultProps = {
  searchResults: [],
}


export default connect(mapStateToProps, {
  searchRequested,
  getDashboard,
  getUnreadMessagesCount,
  toggleSearchMode
})(DashboardStudent);

