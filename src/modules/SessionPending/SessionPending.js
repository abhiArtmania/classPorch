import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import { Grid, Icon, Header, Image, Modal, Button, Label, Rating, Pagination} from 'semantic-ui-react'
import momentTimezone from 'moment-timezone'
import moment from 'moment-timezone'
import './styles.css';
import {connect} from 'react-redux';
import { pendingSession } from '../../redux/actions';
import defultAvtart from "./../../assets/avatar/default.png"

class SessionPending extends Component {

  

  constructor(props) {
    super(props);
   this.state ={
        NotificationList:this.props.session_requests
   }
 
  }

  componentDidMount() {
    
    const page_no = 1;
    
        const params = {
            page_no,
          
        };
        console.log(params);
        this.props.pendingSession(params);
        console.log('test');
    
  }

  componentWillReceiveProps(nextProps) {
    const {chats, error} = nextProps;
    if (error !== undefined && error !== null && error !== this.props.error) {
      //message.error(error);
    }

   
  };

  componentWillUnmount() {
    
  }
  
  render(){
    const {page_no, session_requests, status, total_records}= this.props.session_pending;
   
    const renderTabs = session_requests.map((session_request, i)=>{
            // Random component
            const start_date = momentTimezone(session_request.start_time);
            const end_date = momentTimezone(session_request.end_time);
           const subject =  session_request.tutor.skills.map((subjects) =>{ return <Label  size='small' color='yellow' >  {subjects.name}</Label>}  );
           const pendingdate  = (date) =>{
            return moment(date).fromNow();
     };
            return(
               
                <Grid.Row width={10} key={i++} className='custom-row'>
                    
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
        });
   
    console.log(renderTabs);
    return (
      <Grid className='session-requested-Container' >
         <Grid.Row width={15} >
          <Grid.Column width={12} style={{margin:'0 auto'}}>
          {renderTabs}
          
          </Grid.Column>
        </Grid.Row>
     </Grid>
    )
  }
}

const mapStateToProps = store => {
  const {session_pending }=store.SessionReducer;
  return {session_pending}
};

const mapActionsToProps = () => {
  return {
    pendingSession
  }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionPending);
