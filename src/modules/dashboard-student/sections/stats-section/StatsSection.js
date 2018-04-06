import React from 'react';
import {history} from '../../../../redux/store';
import {Grid, Image, Tab } from 'semantic-ui-react';
import './styles.css';
import {messageIcon, messageIconUnread} from '../../../../assets/dashboard';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
      { menuItem: 'Completed Sessions', render: () => <Tab.Pane attached={false}>Completed Sessions</Tab.Pane> },
      { menuItem: 'Scheduled Sessions', render: () => <Tab.Pane attached={false}>Scheduled Sessions</Tab.Pane> },
      { menuItem: 'Pending Sessions', render: () => <Tab.Pane attached={false}>Pending Sessions</Tab.Pane> },
    ]
    
    return (
      <Grid className='tutor-stats-section'>
        <Grid.Row centered >
          <Grid.Column width={15}>
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


export default connect(mapStateToProps, {})(StatsSection);
