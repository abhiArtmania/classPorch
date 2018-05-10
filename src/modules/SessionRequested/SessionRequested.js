import React, { Component } from 'react';
import { Grid, Icon, Image, Label, Pagination } from 'semantic-ui-react'
import moment from 'moment-timezone'
import { connect } from 'react-redux';

import './styles.css';
import { scheduledSession } from '../../redux/actions';
import defultAvtart from "./../../assets/avatar/default.png"

const recordsPerPage = 5;

class SessionRequested extends Component {
    state = { activePage: 1 }

    constructor(props) {
        super(props);
        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }
    handlePaginationChange = (e, { activePage }) => {
      this.setState({ activePage });
    }
    componentDidMount() {
        const page_no = 1;
        const status = "scheduled"; // default
        const params = {
            page_no,
            status
        };
        this.props.scheduledSession(params);
    }
    render() {
        const { session_requests, total_records } = this.props.session_scheduled;

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
                            <h5 className="time-spent"><Icon name='time' />  </h5>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            );
        });
        return (
            <Grid className='session-requested-Container' >
                <Grid.Row width={15} >
                    <Grid.Column width={12} style={{ margin: '0 auto' }}>
                        {renderTabs}
                        <Pagination
                            activePage={activePage}
                            totalPages={Math.ceil(total_records/recordsPerPage)}
                            onPageChange={this.handlePaginationChange}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = store => {
    const { session_scheduled } = store.SessionReducer;
    return { session_scheduled }
};

const mapActionsToProps = () => {
    return {
        scheduledSession
    }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionRequested);
