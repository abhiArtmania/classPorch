import React, {Component} from 'react';
import Countdown from 'react-countdown-now';
import { Grid, Icon, Header, Image, Modal, Button, Label, Rating, Pagination   } from 'semantic-ui-react'
import moment from 'moment-timezone'
import './styles.css';
import {connect} from 'react-redux';
import { completedSession } from '../../redux/actions';
import defultAvtart from "./../../assets/avatar/default.png"

class SessionCompleted extends Component {

  

  constructor(props) {
    super(props);
   this.state ={
        NotificationList:this.props.session_requests
   }
 
  }

  componentWillMount() {
    
    const page_no = 1;
    const status="completed"; // default
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
  handleChangePage = pageNumber => e => {
    const { gender, q, type } = this.props.searchMetadata;
    const page_no = pageNumber;
    this.props.searchRequested({ type, q, gender, page_no });
  }
  render(){
    const {page_no, session_requests, status, total_records}= this.props;
   
    const renderTabs = session_requests.map((session_request, i)=>{
            // Random component
            const start_date = moment(session_request.start_time);
            const end_date = moment(session_request.end_time);
           const subject =  session_request.tutor.skills.map((subjects) =>{ return <Label  size='small' color='yellow' >  {subjects.name}</Label>}  );
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
                    <h5 className="complete-lable">Completed Mar 25</h5>
                        <Rating icon='star' size='large'  defaultRating={session_request.averageRating||4} maxRating={5} disabled/>
                
                        <h5 className="time-spent"><Icon  name='time' /> Duration 3 hr 20 minutes </h5>
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
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <Pagination
                  searchMetadata={this.props.searchMetadata}
                  onChangePage={this.handleChangePage}
                />
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
  const {page_no, session_requests, status, total_records }=store.SessionReducer;
  return {page_no, session_requests, status, total_records }
};

const mapActionsToProps = () => {
  return {
    completedSession
  }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionCompleted);
