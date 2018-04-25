import React from 'react'
import { Grid, Icon, Table} from 'semantic-ui-react'
import {connect} from 'react-redux';
import './styles.css';
import { history } from '../../../../../redux/store';
import moment from 'moment-timezone'
import { Menu, Dropdown, Image, Input, Button, Rating, Label } from 'semantic-ui-react';
import {
    requestedSession
   
  } from '../../../../../redux/actions';
import defultAvtart from "./../../../../../assets/avatar/default.png"
class CompletedSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Mohit kumar', subject:[{name:'php'},{name:'html'}] ,date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4" },
               {id:2, fullName: 'Mohit kumar', subject: [{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ', averageRating:"4" },
               {id:6, fullName: 'Mohit kumar', subject:[{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4" },
               {id:3, fullName: 'Mohit kumar', subject:[{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4" },
               {id:4, fullName: 'Mohit kumar', subject: [{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4" },
               {id:6, fullName: 'Mohit kumar', subject: [{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ', averageRating:"4" },
               {id:7, fullName: 'Mohit kumar', subject:[{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ' ,averageRating:"4" },
               {id:8, fullName: 'Mohit kumar', subject:[{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ' },
               {id:9, fullName: 'Mohit kumar', subject:[{name:'php'},{name:'html'}],date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ' },
            ],
            limit: 5
        };
        this.onLoadMore=this.onLoadMore.bind(this);
       
    }


    componentDidMount() {
        window.scrollTo(0, 0)
    }
    onLoadMore(e) {
        e.preventDefault();
        const page_no = 1;
        const status="completed" // default
        const params = {
            page_no,
            status
        };
        console.log(params);
        this.props.requestedSession(params);
        history.push('/sessioncompleted');
    }
    

    
    render() {
        
        const {page_no, session_requests, status, total_records}= this.props;
   
    const renderTabs = session_requests.slice(0,this.state.limit).map((session_request, i)=>{
            // Random component
            const start_date = moment(session_request.start_time);
            const end_date = moment(session_request.end_time);
           const subject =  session_request.tutor.skills.map((subjects) =>{ return <Label  size='small' color='yellow' >  {subjects.name}</Label>}  );
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
            <Grid className='complete-session'>
                {renderTabs}
                <div style={{width:'100%'}}>
                <Button color='yellow' className="load-more-right" onClick={this.onLoadMore} >Show More</Button>
                </div >     
                   
            </Grid>
           
        )
    }

}
const mapStateToProps = store => {
    console.log(store)
    const {id: userId, authToken} = store.auth;
    const {sessionRequestIndicator, displayMessage, unreadMessageCount} = store.dashboard;
    const {searchMode, searchResults, loadingSearch} = store.search;
    const {page_no, session_requests, status, total_records }=store.SessionReducer;
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
      page_no,
       session_requests,
        status,
         total_records
    }
  };
  
  
  
  
  export default connect(mapStateToProps, {
      requestedSession
    
  })(CompletedSession);
  
