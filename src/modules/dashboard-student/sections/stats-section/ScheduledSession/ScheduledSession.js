import React from 'react'
import Countdown from 'react-countdown-now';
import { Grid, Icon, Header, Image, Modal, Button, Label, Rating} from 'semantic-ui-react'
import { history } from '../../../../../redux/store';
import {Link} from "react-router-dom";
import moment from 'moment'
import './styles.css';
import {connect} from 'react-redux';
import {
    scheduledSession
   
  } from '../../../../../redux/actions';
import defultAvtart from "./../../../../../assets/avatar/default.png"
class ScheduledSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Jasmine', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'23 ',averageRating:"4",sessiondate:"15 June 2018 24:02:03" },
               {id:2, fullName: 'Hari kumar', subject: 'java',date:'Mar-2017',time:'6:30PM',totalSpendTime:'2', averageRating:"4", sessiondate:"15 June 2018 21:02:03" },
               {id:5, fullName: 'Maria', subject: 'ror',date:'Mar-2017',time:'6:30PM',totalSpendTime:'8 ',averageRating:"4", sessiondate:"15 April 2018 20:02:03" },
               {id:3, fullName: 'Hohny', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'12 ',averageRating:"4", sessiondate:"16 April 2018 03:02:03" },
               {id:4, fullName: 'rohit', subject: 'javascrip',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4", sessiondate:"18 April 2018 03:02:03" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ', averageRating:"4", sessiondate:"19 April 2018 23:52:03" },
              ],
            limit: 5
        };
        this.onLoadMore=this.onLoadMore.bind(this);
       
    }

    componentWillMount() {
    
        const page_no = 1;
        const status="schedule"; // default
            const params = {
                page_no,
                status
            };
            
            this.props.scheduledSession(params);
           
        
      }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    onLoadMore(e) {
        e.preventDefault();
        const page_no = 1;
        const status="scheduled" // default
        const params = {
            page_no,
            status
        };
        console.log(params);
        this.props.scheduledSession(params);
        history.push('/sessionrequested');
    }
    

    
    render() {
        const {page_no, session_requests, status, total_records}= this.props;
        const renderTabs=()=>{
            let nlist=this.state.NotificationList.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
            console.log(this.state.limit);
            const ModalModalExample = (e) =>(
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
                    
            return nlist.slice(0,this.state.limit).map((p,i)=>{
                // Random component
               
                
             const Completionist = () =><span>00:00 </span>;
                // Renderer callback with condition
                const renderer = ({days, hours, minutes, seconds, completed }) => {
                if (completed) {
                    // Render a complete state
                    return <Completionist />;
                }else if (days>30) {
                    var months=Math.ceil(days/30);
                    return <span>{months} months to start</span>;
                }else if (days>7) {
                    var weeks=Math.ceil(days/7);
                    return <span>{weeks} weeks to start</span>;
                }else if (days>0) {
                    return <span>{days} days to start</span>;
                } else if (hours>0) {
                    return <span>{hours} hours to start</span>;
                }else if (minutes>0) {
                    return <span>{minutes}:{seconds} to start</span>;
                }else {
                    // Render a countdown
                    
                    return false
                }
                };
                var date2= Date.now();
                    var date1 = new Date(p.sessiondate);
                    var a = moment(Date.now());//now
    var b = moment(p.sessiondate);
    
                    var diff = b.diff(a, 'hours');
                   console.log(diff);
                return(
                   
                    <Grid.Row width={10} key={i} className='session-row'>
                        
                    <Grid.Column width={16} className='userInfo'>
                   
                        <Image src={defultAvtart} size='medium' circular  className="tutor-img"  />
                   
                    <div style={{float:'left'}}>
                   
                      
                   
                        <h4 className="userName"><div className="ui green circular label"></div> {p.fullName}</h4>
                        <Label  size='small' >  {p.subject}</Label> 
                       
                      
                        <p className="full-date"><span className="start-date">Jan 15 </span> - <span className="end-date">Mar 25</span></p>
                    
                    </div>
                    <div style={{float:'right'}}>
                       
                        <h5 className="time-spent"><Icon  name='time' />  <Countdown date={p.sessiondate}    renderer={renderer}  /></h5>
                        {(diff < 0 )?<ModalModalExample />: (diff<24 && <Button color='yellow' className="reschedule" >Reschedule</Button>)}
                    </div>
                    </Grid.Column>
                </Grid.Row>
                );
            });
        };
        return (
            <Grid className='complete-session'>
                 {total_records>0?renderTabs:<p className="no-record">No scheduled Session </p>}
               {total_records>5 ?<div style={{width:'100%'}}>
                <Button color='yellow' className="load-more-right" onClick={this.onLoadMore} >Show More</Button>
                </div > :''}     
                   
            </Grid>
           
        )
    }

}
const mapStateToProps = store => {
  console.log(store)
  const {id: userId, authToken} = store.auth;
  const {sessionRequestIndicator, displayMessage, unreadMessageCount} = store.dashboard;
  const {searchMode, searchResults, loadingSearch} = store.search;
  const {session_scheduled,session_pending,session_completed }=store.SessionReducer;
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
    scheduledSession
  
})(ScheduledSession);
