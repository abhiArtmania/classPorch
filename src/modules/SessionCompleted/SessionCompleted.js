import React, { Component } from 'react';
import { Grid, Icon, Image, Label, Rating, Pagination } from 'semantic-ui-react'
import moment from 'moment-timezone'

import './styles.css';
import { connect } from 'react-redux';
import { completedSession } from '../../redux/actions';
import defultAvtart from "./../../assets/avatar/default.png"

const recordsPerPage = 5;
  
class SessionCompleted extends Component {
  state = { activePage: 1 }

  constructor(props) {
    super(props);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
  }
  render() {
    const { session_requests, total_records } = this.props.session_completed;

    const { activePage } = this.state

    let startIndex = activePage === 1 ? (activePage - 1) : (activePage - 1) * recordsPerPage;
    let endIndex = startIndex + recordsPerPage;

    const renderTabs = session_requests.slice(startIndex, endIndex).map((session_request, i) => {
      const start_date = moment(session_request.start_time);
      const end_date = moment(session_request.end_time);
      const subject = session_request.tutor.skills.map((subjects) => { return <Label size='small' color='yellow' >  {subjects.name}</Label> });
      return (
        <Grid.Row width={10} key={i++} className='custom-row'>
          <Grid.Column width={16} className='userInfo'>
            <Image src={defultAvtart} size='medium' circular className="tutor-img" />
            <div style={{ float: 'left' }}>
              <h4 className="userName"><div className="ui green circular label"></div> {session_request.tutor.fullname}</h4>
              {subject}
              <p className="full-date"><span className="start-date">{start_date._d.toDateString()} </span> - <span className="end-date">{end_date._d.toDateString()}</span></p>
            </div>
            <div style={{ float: 'right' }}>
              <h5 className="complete-lable">Completed Mar 25 {startIndex} {endIndex}</h5>
              <Rating icon='star' size='large' defaultRating={session_request.averageRating || 4} maxRating={5} disabled />
              <h5 className="time-spent"><Icon name='time' /> Duration 3 hr 20 minutes </h5>
            </div>
          </Grid.Column>
        </Grid.Row>
      );
    });

    return (
      <Grid className='session-requested-Container'>
        <Grid.Row width={15} >
          <Grid.Column width={12} style={{ margin: '0 auto' }}>
            {renderTabs}
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <Pagination
                    activePage={activePage}
                    totalPages={Math.ceil(total_records/recordsPerPage)}
                    onPageChange={this.handlePaginationChange}
                  />
                </div>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = store => {
  const { session_completed } = store.SessionReducer;
  return { session_completed }
};

const mapActionsToProps = () => {
  return {
    completedSession
  }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionCompleted);
