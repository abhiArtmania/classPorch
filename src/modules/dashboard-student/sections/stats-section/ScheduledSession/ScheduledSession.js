import React from 'react'
import Countdown from 'react-countdown-now';
import { Grid, Icon, Header, Image, Modal, Button, Label, Rating} from 'semantic-ui-react'
import './styles.css';
import defultAvtart from "./../../../../../assets/avatar/default.png"
class ScheduledSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'23 ',averageRating:"4" },
               {id:2, fullName: 'Mohit kumar', subject: 'java',date:'Mar-2017',time:'6:30PM',totalSpendTime:'2', averageRating:"4" },
               {id:6, fullName: 'Maria', subject: 'ror',date:'Mar-2017',time:'6:30PM',totalSpendTime:'8 ',averageRating:"4" },
               {id:3, fullName: 'Hohny', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'12 ',averageRating:"4" },
               {id:4, fullName: 'rohit', subject: 'javascrip',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ', averageRating:"4" },
              ],
            limit: 5
        };
       
    }


    componentDidMount() {
        window.scrollTo(0, 0)
    }
    onLoadMore = (e) => {
        e.preventDefault();
        console.log(this.state.limit);
        this.setState({
            limit: this.state.limit + 5
        });
    }
    

    renderTabs(){
        let nlist=this.state.NotificationList.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
        console.log(this.state.limit);
        return nlist.slice(0,this.state.limit).map((p)=>{
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
                    <h4 style={{color:'orange'}}>Schedule</h4>
                    <h5 className="time-spent"><Icon  name='time' /> <Countdown date={Date.now() + 5000000}>
                        <p>Go now..</p>
                    </Countdown>  </h5>
                   {(p.id/2)===1 ?<Button color='yellow' className="reschedule" >Reschedule</Button>:<Modal trigger={<Button color='yellow' className="join-room" >Join Room</Button>  }>
                        <Modal.Header> {p.fullName}</Modal.Header>
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
                <Button color='yellow' className="load-more-right" >Show More</Button>
                </div >     
                   
            </Grid>
           
        )
    }

}

export default ScheduledSession