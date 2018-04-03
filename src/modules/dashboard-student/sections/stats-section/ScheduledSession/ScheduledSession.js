import React from 'react'
import { Grid, Icon, Table} from 'semantic-ui-react'
import './styles.css';

import { Menu, Dropdown, Image, Input, Button, Rating } from 'semantic-ui-react';
import defultAvtart from "./../../../../../assets/avatar/default.png"
class ScheduledSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'23 hours',averageRating:"4" },
               {id:2, fullName: 'Mohit kumar', subject: 'java',date:'Mar-2017',time:'6:30PM',totalSpendTime:'2 hours', averageRating:"4" },
               {id:6, fullName: 'Maria', subject: 'ror',date:'Mar-2017',time:'6:30PM',totalSpendTime:'8 hours',averageRating:"4" },
               {id:3, fullName: 'Hohny', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'12 hours',averageRating:"4" },
               {id:4, fullName: 'rohit', subject: 'javascrip',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours',averageRating:"4" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours', averageRating:"4" },
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
               
                <Grid.Row width={14} className='custom-row'>
                    <Grid.Column width={2} className='profileImage'>
                        <Image src={defultAvtart} size='medium' circular />
                    </Grid.Column>
                    <Grid.Column width={4} className='userInfo'>
                        <h3 className="userName"><div className="ui green circular label"></div> {p.fullName}</h3>
                        <h4 className="ui  labels "> {p.subject}  </h4>
                        <p><span className="start-date">Jan 15 </span> - <span className="end-date">Mar 25</span></p>
                    
                    </Grid.Column>
                    <Grid.Column width={5} className=""> 
                        <h4 className="complete-lable">ScheduledSession</h4>
                        <Rating icon='star' size='large'  defaultRating={p.averageRating||4} maxRating={5} disabled/>
                    </Grid.Column>
                    <Grid.Column width={5} className="">
                        <h4 className="time-spent">Total Time {p.totalSpendTime}</h4>
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