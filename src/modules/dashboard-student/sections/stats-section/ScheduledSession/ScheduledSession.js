import React from 'react'
import Countdown from 'react-countdown-now';
import { Grid, Icon, Header, Image, Modal, Button, Label, Rating} from 'semantic-ui-react'
import { history } from '../../../../../redux/store';
import {Link} from "react-router-dom";
import moment from 'moment'
import './styles.css';
import {connect} from 'react-redux';
import {
    sessionRequested,
   
  } from '../../../../../redux/actions';
import defultAvtart from "./../../../../../assets/avatar/default.png"
class ScheduledSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Jasmine', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'23 ',averageRating:"4",sessiondate:"13 June 2018 03:02:03" },
               {id:2, fullName: 'Hari kumar', subject: 'java',date:'Mar-2017',time:'6:30PM',totalSpendTime:'2', averageRating:"4", sessiondate:"13 June 2018 03:02:03" },
               {id:6, fullName: 'Maria', subject: 'ror',date:'Mar-2017',time:'6:30PM',totalSpendTime:'8 ',averageRating:"4", sessiondate:"15 April 2018 03:02:03" },
               {id:3, fullName: 'Hohny', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'12 ',averageRating:"4", sessiondate:"16 April 2018 03:02:03" },
               {id:4, fullName: 'rohit', subject: 'javascrip',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4", sessiondate:"12 April 2018 03:02:03" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ', averageRating:"4", sessiondate:"11 April 2018 23:52:03" },
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
        const page_no = 1; // default
        const params = {
            page_no,
            
        };
        console.log(params);
        this.props.sessionRequested(params);
    }
    

    renderTabs(){
        let nlist=this.state.NotificationList.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
        console.log(this.state.limit);
        // Random component
                const Completionist = () => <span> </span>;

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
                    
                    return <span>00 :00 </span>;
                }
                };
                
        return nlist.slice(0,this.state.limit).map((p)=>{
            var date2= Date.now();
                var date1 = new Date(p.sessiondate);
                var diff = Math.abs(date1.getTime() - date2) / 3600000;
               
            return(
               
                <Grid.Row width={10} className='custom-row'>
                    
                <Grid.Column width={15} className='userInfo'>
               
                    <Image src={defultAvtart} size='medium' circular  className="tutor-img"  />
               
                <div style={{float:'left'}}>
               
                  
               
                    <h4 className="userName"><div className="ui green circular label"></div> {p.fullName}</h4>
                    <Label  size='small' >  {p.subject}</Label> 
                   
                  
                    <p><span className="start-date">Jan 15 </span> - <span className="end-date">Mar 25</span></p>
                
                </div>
                <div style={{float:'right'}}>
                   
                    <h5 className="time-spent"><Icon  name='time' />  <Countdown date={p.sessiondate}    renderer={renderer}  /></h5>
                   {diff > 24 ?<Button color='yellow' className="reschedule" >Reschedule</Button>:<Modal trigger={<Button color='yellow' className="join-room" >Join Room</Button>  }>
                        <Modal.Header>s {p.fullName}</Modal.Header>
                        <Modal.Content image>
                        <Image wrapped size='medium' src={defultAvtart}/>
                        <Modal.Description>
                            <Header>Default Profile Image</Header>
                            <p>We've found the following gravatar image associated with your e-mail address.</p>
                            <p>Is it okay to use this photo?</p>
                        </Modal.Description>
                        </Modal.Content>
                    </Modal>
                 }
                </div>
                </Grid.Column>
            </Grid.Row>
            );
        });
    };
    render() {
       

        return (
            <Grid className='complete-session'>
                {this.renderTabs()}
                <div style={{width:'100%'}}>
                <Link to="/sessionrequested"><Button color='yellow' className="load-more-right" onClick={this.onLoadMore} >Show More</Button></Link>
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
  return {
    userId,
    authToken,
    sessionRequestIndicator,
    displayMessage,
    unreadMessageCount,
    searchMode,
    searchResults,
    loadingSearch,
    searchMetadata: store.search.metadata
  }
};




export default connect(mapStateToProps, {
    sessionRequested
  
})(ScheduledSession);
