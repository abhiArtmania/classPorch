import React from 'react'
import { Grid, Icon, Table} from 'semantic-ui-react'
import { history } from '../../../../../redux/store';
import './styles.css';
import Countdown from 'react-countdown-now';
import {connect} from 'react-redux';
import momentTimezone from 'moment-timezone'
import moment from 'moment';
import {Link} from "react-router-dom";
import { Menu, Dropdown, Image, Input, Button, Rating, Label } from 'semantic-ui-react';
import defultAvtart from "./../../../../../assets/avatar/default.png"
import {
    pendingSession
   
  } from '../../../../../redux/actions';
class PendingSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'23 ',averageRating:"4",sessiondate:"13 Jan 2018 03:02:03" },
               {id:2, fullName: 'Mohit kumar', subject: 'java',date:'Mar-2017',time:'6:30PM',totalSpendTime:'2', averageRating:"4", sessiondate:"27 Feb 2018 03:02:03" },
               {id:6, fullName: 'Maria', subject: 'ror',date:'Mar-2017',time:'6:30PM',totalSpendTime:'8 ',averageRating:"4", sessiondate:"15 March 2018 03:02:03" },
               {id:3, fullName: 'Hohny', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'12 ',averageRating:"4", sessiondate:"16 Dec 2017 03:02:03" },
               {id:4, fullName: 'rohit', subject: 'javascrip',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4", sessiondate:"18 March 2018 03:02:03" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ', averageRating:"4", sessiondate:"11 April 2018 23:02:03" },
              ],
            limit: 5
        };
        this.onLoadMore=this.onLoadMore.bind(this);
    }

    componentWillMount() {
    
        const page_no = 1;
        const status="pending"; // default
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
        const page_no = 1;
        const status="scheduled" // default
        const params = {
            page_no,
            status
        };
        console.log(params);
        this.props.pendingSession(params);
        history.push('/sessionpending');
    }
    

    render() {
        const {page_no, session_requests, status, total_records}= this.props.session_pending;
        console.log(this.props.session_pending);
            
        const renderTabs=  session_requests.length>0?session_requests.slice(0,this.state.limit).map((session_request, i)=>{
                // Random component
                const start_date = momentTimezone(session_request.start_time);
                const end_date = momentTimezone(session_request.end_time);
               const subject =  session_request.tutor.skills.map((subjects) =>{ return <Label  size='small' color='yellow' >  {subjects.name}</Label>}  );
               const pendingdate  = (date) =>{
                return moment(date).fromNow();
         };
                return(
                   
                    <Grid.Row width={10} key={i++} className='session-row'>
                        
                    <Grid.Column width={16} className='userInfo'>
                   
                        <Image src={defultAvtart} size='medium' circular  className="tutor-img"  />
                   
                    <div style={{float:'left'}}>
                   
                      
                   
                        <h4 className="userName"><div className="ui green circular label"></div> {session_request.tutor.fullname}</h4>
                        {subject}
                       
                      
                        <p className="full-date"><span className="start-date">{start_date._d.toDateString()} </span> - <span className="end-date">{end_date._d.toDateString()}</span></p>
                    
                    </div>
                    <div style={{float:'right'}}>
                       
                    <h5 className="time-spent"><Icon  name='time' />{pendingdate(start_date._d.toDateString())}</h5>
                    <Button color='yellow' className="cancel" >Cancel</Button>
                    </div>
                    </Grid.Column>
                </Grid.Row>
                );
            }):'';
       
       
   
   
        return (
            <Grid className='complete-session'>
                 {total_records>0?renderTabs:<p className="no-record">No pending Session </p>}
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
      session_scheduled,session_pending,session_completed
    }
  };
  
  
  
  
  export default connect(mapStateToProps, {
    pendingSession
    
  })(PendingSession);
