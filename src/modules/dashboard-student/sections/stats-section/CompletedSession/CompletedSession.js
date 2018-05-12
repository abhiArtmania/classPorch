import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment-timezone'
import { Grid, Icon, Image, Button, Rating, Label } from 'semantic-ui-react';

import './styles.css';
import { history } from '../../../../../redux/store';
import { completedSession } from '../../../../../redux/actions';
import defultAvtart from "./../../../../../assets/avatar/default.png"

const limit = 5;

class CompletedSession extends React.Component {
    constructor(props) {
        super(props);
        
        this.onLoadMore = this.onLoadMore.bind(this);

        this.renderTabs = this.renderTabs.bind(this);
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    onLoadMore(e) {
        e.preventDefault();
        history.push('/sessioncompleted');
    }
    renderTabs = (session_requests) => {
        if (session_requests.length > 0) {
            return session_requests.slice(0, limit).map((session_request, i) => {
                const start_date = moment(session_request.start_time);
                const end_date = moment(session_request.end_time);
                const subject = session_request.tutor.skills.map((subjects) => { return <Label size='small' color='yellow' >  {subjects.name}</Label> });
                return (
                    <Grid.Row width={10} key={i++} className='session-row'>
                        <Grid.Column width={16} className='userInfo'>
                            <Image src={defultAvtart} size='medium' circular className="tutor-img" />
                            <div style={{ float: 'left' }}>
                                <h4 className="userName"><div className="ui green circular label"></div> {session_request.tutor.fullname}</h4>
                                {subject}
                                <p className="full-date"><span className="start-date">{start_date.format('MMM DD')} </span> - <span className="end-date">{end_date.format('MMM DD')}</span></p>
                            </div>
                            <div style={{ float: 'right' }}>
                                <h5 className="complete-lable">Completed {end_date.format('MMM DD')}</h5>
                                <Rating icon='star' size='large' defaultRating={session_request.averageRating || 4} maxRating={5} disabled />
                                <h5 className="time-spent"><Icon name='time' /> Duration 3 hr 20 minutes </h5>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                );
            });
        }
    }
    render() {
        const { session_requests, total_records } = this.props.session_completed;

        return (
            <Grid className='complete-session'>
                {total_records > 0 ? this.renderTabs(session_requests) : <p className="no-record">No completed Session </p>}
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
        session_scheduled,
        session_pending,
        session_completed
    }
};

export default connect(mapStateToProps, {
    completedSession
})(CompletedSession);

