import React from 'react';
import {history} from '../../../../redux/store';
import {Grid, Image} from 'semantic-ui-react';
import './styles.css';
import {messageIcon, messageIconUnread} from '../../../../assets/dashboard';
import {connect} from 'react-redux';

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

    return (
      <Grid className='tutor-stats-section'>
        
        <Grid.Row/>
        
        <Grid.Row/>
        <Grid.Row/>
        
      </Grid>
    );
  }
}

const mapStateToProps = ({dashboard}) => {
  return {dashboard}
};


export default connect(mapStateToProps, {})(StatsSection);

