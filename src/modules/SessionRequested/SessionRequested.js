import React, { Component } from 'react';
import { Grid, Icon, Image, Label, Pagination, Button, Modal, Header } from 'semantic-ui-react'
import moment from 'moment-timezone'
import { connect } from 'react-redux';
import Countdown from 'react-countdown-now';

import './styles.css';
import {history} from '../../redux/store';
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

        const ModalModalExample = (e) => (
            <Modal trigger={<Button color='yellow' className="join-room">Join Room</Button>}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );

        const Completionist = () => <span>00:00 </span>;

        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
                console.log('completed', completed);
                return <Completionist />;
            } else if (days > 30) {
                var months = Math.ceil(days / 30);
                return <span>{months} months to start</span>;
            } else if (days > 7) {
                var weeks = Math.ceil(days / 7);
                return <span>{weeks} weeks to start</span>;
            } else if (days > 0) {
                return <span>{days} days to start</span>;
            } else if (hours > 0) {
                return <span>{hours} hours to start</span>;
            } else if (minutes > 0) {
                return <span>{minutes}:{seconds} to start</span>;
            } else {
                return false
            }
        };

        const renderTabs = session_requests.slice(startIndex, endIndex).map((session_request, i) => {
            const start_date = moment(session_request.start_time);
            const end_date = moment(session_request.end_time);
            const diff = start_date.diff(end_date, 'hours');
            const sessionMinutesDiff = start_date.diff(end_date, 'minutes');
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
                            {/* <h5 className="time-spent"><Icon name='time' />  </h5> */}
                            <h5 className="time-spent"><Icon name='time' />  <Countdown date={session_request.start_time} renderer={renderer} /></h5>
                            {(diff < 0) ? <ModalModalExample /> : (diff < 24 && sessionMinutesDiff >= 30 && <Button color='yellow' className="reschedule" >Reschedule</Button>)}
                            {sessionMinutesDiff < 30 && <Button color='yellow' className="reschedule" >Join Room</Button>}
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
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-10">
                                    <Pagination
                                        activePage={activePage}
                                        totalPages={Math.ceil(total_records / recordsPerPage)}
                                        onPageChange={this.handlePaginationChange}
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
    const { session_scheduled } = store.SessionReducer;
    return { session_scheduled }
};

const mapActionsToProps = () => {
    return {
        scheduledSession
    }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionRequested);
