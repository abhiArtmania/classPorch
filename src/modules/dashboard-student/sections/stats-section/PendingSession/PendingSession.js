import React from 'react'
import { Grid, Icon, Image, Button, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import momentTimezone from 'moment-timezone'
import moment from 'moment';

import { history } from '../../../../../redux/store';
import './styles.css';
import defultAvtart from "./../../../../../assets/avatar/default.png"
import { pendingSession } from '../../../../../redux/actions';

const limit = 5;

class PendingSession extends React.Component {
    constructor(props) {
        super(props);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
        this.pendingdate = this.pendingdate.bind(this);
    }

    componentWillMount() {
        const page_no = 1;
        const status = "pending";
        const params = {
            page_no,
            status
        };
        this.props.pendingSession(params);
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    onLoadMore(e) {
        e.preventDefault();
        history.push('/sessionpending');
    }
    pendingdate = (date) => {
        return moment(date).fromNow();
    };
    renderTabs = (session_requests) => {
        if (session_requests.length > 0) {
            return session_requests.slice(0, limit).map((session_request, i) => {
                const start_date = momentTimezone(session_request.start_time);
                const end_date = momentTimezone(session_request.end_time);
                const subject = session_request.tutor.skills.map((subjects) => { return <Label size='small' color='yellow' >  {subjects.name}</Label> });
                return (
                    <Grid.Row width={10} key={i++} className='session-row'>
                        <Grid.Column width={16} className='userInfo'>
                            <Image src={defultAvtart} size='medium' circular className="tutor-img" />
                            <div style={{ float: 'left' }}>
                                <h4 className="userName"><div className="ui green circular label"></div> {session_request.tutor.fullname}</h4>
                                {subject}
                                <p className="full-date"><span className="start-date">{start_date._d.toDateString()} </span> - <span className="end-date">{end_date._d.toDateString()}</span></p>
                            </div>
                            <div style={{ float: 'right' }}>
                                <h5 className="time-spent"><Icon name='time' />{this.pendingdate(start_date._d.toDateString())}</h5>
                                <Button color='yellow' className="cancel" >Cancel</Button>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                );
            });
        }
    }
    render() {
        const { session_requests, total_records } = this.props.session_pending;
        console.log('session pending', session_requests);
        return (
            <Grid className='complete-session'>
                {total_records > 0 ? this.renderTabs(session_requests) : <p className="no-record">No pending Session </p>}
                {total_records > limit ? <div style={{ width: '100%' }}>
                    <Button color='yellow' className="load-more-right" onClick={this.onLoadMore} >Show More</Button>
                </div > : ''}
            </Grid>
        )
    }
}
const mapStateToProps = store => {
    const { id: userId, authToken } = store.auth;
    const { sessionRequestIndicator, displayMessage, unreadMessageCount } = store.dashboard;
    const { searchMode, searchResults, loadingSearch } = store.search;
    const { session_scheduled, session_pending, session_completed } = store.SessionReducer;
    return {
        userId,
        authToken,
        sessionRequestIndicator,
        displayMessage,
        unreadMessageCount,
        searchMode,
        searchResults,
        loadingSearch,
        searchMetadata: store.search.metadata,
        session_scheduled, session_pending, session_completed
    }
};

export default connect(mapStateToProps, {
    pendingSession
})(PendingSession);
