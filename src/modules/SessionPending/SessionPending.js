import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Icon,
  Image,
  Button,
  Label,
} from 'semantic-ui-react'
import momentTimezone from 'moment-timezone';

import './styles.css';
import {history} from '../../redux/store';
import { 
  searchRequested,
  pendingSession
} from '../../redux/actions';
import defultAvtart from "./../../assets/avatar/default.png"
import { Pagination } from "../../components/common";

class SessionPending extends Component {
  constructor(props) {
    super(props);
    this.pendingdate = this.pendingdate.bind(this);
  }
  componentDidMount() {
    this.props.pendingSession({ page_no: 1 });
  }
  handleChangePage = page_no => e => {
    this.props.pendingSession({ page_no });
  }
  pendingdate = (date) => {
    return momentTimezone(date).fromNow();
  };
  render() {
    const { session_requests, total_records, page_no } = this.props.session_pending;

    const renderTabs = session_requests.map((session_request, i) => {
      const start_date = momentTimezone(session_request.start_time);
      const end_date = momentTimezone(session_request.end_time);
      const subject = session_request.tutor.skills.map((subjects) => { return <Label size='small' color='yellow' >  {subjects.name}</Label> });
      return (
        <Grid.Row width={10} key={i++} className='custom-row'>
          <Grid.Column width={16} className='userInfo'>
            <Image src={defultAvtart} size='medium' circular className="tutor-img" />
            <div style={{ float: 'left' }}>
              <h4 className="userName"><div className="ui green circular label"></div> {session_request.tutor.fullname}</h4>
              {subject}
              <p className="full-date"><span className="start-date">{start_date.format('MMM DD')} </span> - <span className="end-date">{end_date.format('MMM DD')}</span></p>
            </div>
            <div style={{ float: 'right' }}>
              <h5 className="time-spent"><Icon name='time' />{this.pendingdate(start_date._d.toDateString())}</h5>
              <Button color='yellow' className="cancel" >Cancel</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      );
    });
    return (
      <Grid className='session-requested-Container' >
        <Grid.Row width={15}>
          <Grid.Column width={10} style={{ margin: '0 auto' }}>
            {renderTabs}
            <div className="container">
              <div className="row">
                <div className="col-sm-10">
                  <Pagination
                    searchMetadata={{
                      page_no,
                      total_count: total_records,
                    }}
                    onChangePage={this.handleChangePage}
                  />
                </div>
                <div className="col-sm-2">
                  <Button onClick={(e) => { e.preventDefault(); history.push('/dashboard/student'); }}>&lt; Back</Button>
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
  const { session_pending } = store.SessionReducer;

  return { session_pending }
};

const mapActionsToProps = () => {
  return {
    searchRequested,
    pendingSession
  }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionPending);
