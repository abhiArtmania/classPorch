import React from 'react'
import { Grid, Icon, Table} from 'semantic-ui-react'
import './styles.css';
import Countdown from 'react-countdown-now';
import { Menu, Dropdown, Image, Input, Button, Rating, Label } from 'semantic-ui-react';
import defultAvtart from "./../../../../../assets/avatar/default.png"
class PendingSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'23 ',averageRating:"4",sessiondate:"13 April 2018 03:02:03" },
               {id:2, fullName: 'Mohit kumar', subject: 'java',date:'Mar-2017',time:'6:30PM',totalSpendTime:'2', averageRating:"4", sessiondate:"14 April 2018 03:02:03" },
               {id:6, fullName: 'Maria', subject: 'ror',date:'Mar-2017',time:'6:30PM',totalSpendTime:'8 ',averageRating:"4", sessiondate:"15 April 2018 03:02:03" },
               {id:3, fullName: 'Hohny', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'12 ',averageRating:"4", sessiondate:"16 April 2018 03:02:03" },
               {id:4, fullName: 'rohit', subject: 'javascrip',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ',averageRating:"4", sessiondate:"18 April 2018 03:02:03" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 ', averageRating:"4", sessiondate:"12 April 2018 03:02:03" },
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
        // Random component
        const Completionist = () => <span>You are good to go!</span>;

        // Renderer callback with condition
        const renderer = ({days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{days} days:{hours} hours:{minutes} minutes:{seconds} seconds</span>;
        }
        };
        return nlist.slice(0,this.state.limit).map((p)=>{
            return(
               
                <Grid.Row width={10} className='custom-row'>
                    
                <Grid.Column width={15} className='userInfo'>
               
                    <Image src={defultAvtart} size='medium' circular  className="tutor-img"  />
               
                <div style={{float:'left'}}>
               
                  
               
                    <h4 className="userName"><div className="ui green circular label"></div> {p.fullName}</h4>
                    <Label  size='small' >  {p.subject}</Label> 
                   
                  
                    <p><span className="start-date"> </span>  <span className="end-date"></span></p>
                
                </div>
                <div style={{float:'right'}}>
               <h5 className="time-spent"><Icon  name='time' /><Countdown date={p.sessiondate}    renderer={renderer}  /> ago</h5>
                <Button color='yellow' className="load-more-right" >Cancel</Button>
                   
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

export default PendingSession