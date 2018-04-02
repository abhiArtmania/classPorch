import React from 'react'
import { Grid, Icon, Table} from 'semantic-ui-react'
import './styles.css';

import { Menu, Dropdown, Image, Input, Button, Rating } from 'semantic-ui-react';
import defultAvtart from "./../../../../assets/avatar/default.png"
class CompletedSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:1, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours',averageRating:"4" },
               {id:2, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours', averageRating:"4" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours',averageRating:"4" },
               {id:3, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours',averageRating:"4" },
               {id:4, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours',averageRating:"4" },
               {id:6, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours', averageRating:"4" },
               {id:7, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours' ,averageRating:"4" },
               {id:8, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours' },
               {id:9, fullName: 'Mohit kumar', subject: 'php',date:'Mar-2017',time:'6:30PM',totalSpendTime:'3 hours' },
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
                <Grid.Column width={14} className='userInfo'>
                    <h3 className="userName"><div className="ui green circular label"></div> {p.fullName}<span className="time-spent">{p.totalSpendTime}</span></h3>
                    <h4>Mphil in Philosophy(Masters)-Glasgow University </h4>
                    <div>
                   <div><div className="ui small label"> {p.averageRating?p.averageRating: 0}</div> 
                        <Rating  defaultRating={p.averageRating||0} maxRating={5} disabled/> </div>
                    </div>
                    <div className="ui  labels subjects">
                    {p.subject}
                   
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
                <Grid.Row width={14} centered >
                <Button color='yellow'  onClick={this.onLoadMore.bind(this)}>Show More</Button>
                </Grid.Row >     
                   
            </Grid>
           
        )
    }

}

export default CompletedSession