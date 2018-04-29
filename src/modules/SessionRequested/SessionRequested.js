import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import { Grid, Icon, Header, Image, Modal, Button, Label, Rating, Pagination } from 'semantic-ui-react'
import moment from 'moment-timezone'
import './styles.css';
import {connect} from 'react-redux';
import { scheduledSession } from '../../redux/actions';
import defultAvtart from "./../../assets/avatar/default.png"

class SessionRequested extends Component {

  

  constructor(props) {
    super(props);
   this.state ={
        NotificationList:this.props.session_requests
   }
 
  }

  componentDidMount() {
    
    const page_no = 1;
    const status="scheduled"; // default
        const params = {
            page_no,
            status
        };
        console.log(params);
        this.props.requestedSession(params);
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
    const {page_no, session_requests, status, total_records}= this.props;
   
    const renderTabs = session_requests.map((session_request, i)=>{
            // Random component
            const start_date = moment(session_request.start_time);
            const end_date = moment(session_request.end_time);
           const subject =  session_request.tutor.skills.map((subjects) =>{ return <Label  size='small' color='yellow' >  {subjects.name}</Label>}  );
          /*  
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
               console.log(diff);*/
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
                   
                    <h5 className="time-spent"><Icon  name='time' />  </h5>
                    {/*(diff < 0 )?<ModalModalExample />: (diff<24 && <Button color='yellow' className="reschedule" >Reschedule</Button>)*/}
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
         <Pagination
   defaultActivePage={1}
   firstItem={null}
   lastItem={null}
   pointing
   secondary
   totalPages={3}
 />
         </Grid.Column>
       </Grid.Row>
    </Grid>
    )
  }
}

const mapStateToProps = store => {
  const {page_no, session_requests, status, total_records }=store.SessionReducer;
  return {page_no, session_requests, status, total_records }
};

const mapActionsToProps = () => {
  return {
    scheduledSession
  }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionRequested);
