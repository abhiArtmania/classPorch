import React from 'react'
import Countdown from 'react-countdown-now';
import { Grid, Icon, Header, Image, Modal, Button, Label } from 'semantic-ui-react'
import moment from 'moment'
import { connect } from 'react-redux';

import { history } from '../../../../../redux/store';
import './styles.css';
import { scheduledSession } from '../../../../../redux/actions';
import defultAvtart from "./../../../../../assets/avatar/default.png"

const limit = 5;

class ScheduledSession extends React.Component {
    constructor(props) {
        super(props);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.renderTabs = this.renderTabs.bind(this);
    }

    componentWillMount() {
        const page_no = 1;
        const status = "schedule"; // default
        const params = {
            page_no,
            status
        };

        this.props.scheduledSession(params);
        console.log('SchedulesSession componentWillMount');

    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    onLoadMore(e) {
        e.preventDefault();
        const page_no = 1;
        const status = "scheduled" // default
        const params = {
            page_no,
            status
        };
        this.props.scheduledSession(params);
        history.push('/sessionrequested');
    }
    renderTabs = (session_requests) => {
        let nlist = session_requests.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
        console.log(session_requests, nlist);
        
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

        return nlist.slice(0, limit).map((p, i) => {
            console.log('sessiondate', p);
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

            var date2 = Date.now();
            var date1 = new Date(p.sessiondate);

            var a = moment(new Date());//now
            var b = moment(p.sessiondate);

            var diff = b.diff(a, 'hours');
            const sessionMinutesDiff = b.diff(a, 'minutes');
            const skills = p.tutor.skills.map((subjects) => { return <Label size='small' color='yellow' >  {subjects.name}</Label> });
            return (
                <Grid.Row width={10} key={i} className='session-row'>
                    <Grid.Column width={16} className='userInfo'>
                        <Image src={defultAvtart} size='medium' circular className="tutor-img" />
                        <div style={{ float: 'left' }}>
                            <h4 className="userName"><div className="ui green circular label"></div> {p.tutor.fullname}</h4>
                            {skills}
                            <p className="full-date"><span className="start-date">{moment(p.start_time).format('MMM DD')} </span> - <span className="end-date">{moment(p.end_time).format('MMM DD')}</span></p>
                        </div>
                        <div style={{ float: 'right' }}>
                            <h5 className="time-spent"><Icon name='time' />  <Countdown date={p.start_time} renderer={renderer} /></h5>
                            {(diff < 0) ? <ModalModalExample /> : (diff < 24 && sessionMinutesDiff >= 30 && <Button color='yellow' className="reschedule" >Reschedule</Button>)}
                            {sessionMinutesDiff < 30 && <Button color='yellow' className="reschedule" >Join Room</Button>}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            );
        });
    }
    render() {
        const { session_requests, total_records } = this.props.session_scheduled;
        
        return (
            <Grid className='complete-session'>
                {total_records > 0 ? this.renderTabs(session_requests) : <p className="no-record">No scheduled Session </p>}
                {total_records > limit ? <div style={{ width: '100%' }}>
                    <Button color='yellow' className="load-more-right" onClick={this.onLoadMore} >Show More</Button>
                </div > : ''}
            </Grid>
        )
    }
}
const mapStateToProps = store => {
    const { session_scheduled } = store.SessionReducer;
    return { session_scheduled }
};

export default connect(mapStateToProps, {
    scheduledSession
})(ScheduledSession);
