import React from 'react'
import { Grid, Icon, Table} from 'semantic-ui-react'
import './styles.css';
import { history } from '../../../../../redux/store';
import { Menu, Dropdown, Image, Input, Button, Rating, Label } from 'semantic-ui-react';
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
       
    }


    componentDidMount() {
        window.scrollTo(0, 0)
    }
    onLoadMore = (e) => {
        e.preventDefault();
        history.push('/sessionrequested');
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
                        <Label  size='small' >  {p.subject[0].name}</Label> 
                       
                      
                        <p className="full-date"><span className="start-date">Jan 15 </span> - <span className="end-date">Mar 25</span></p>
                    
                    </div>
                    <div style={{float:'right'}}>
                    <h5 className="complete-lable">Completed Mar 25</h5>
                        <Rating icon='star' size='large'  defaultRating={p.averageRating||4} maxRating={5} disabled/>
                
                        <h5 className="time-spent"><Icon  name='time' /> Duration {p.totalSpendTime} hr 20 minutes </h5>
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
                <Button color='yellow' className="load-more-right" onClick={this.onLoadMore} >Show More</Button>
                </div >     
                   
            </Grid>
           
        )
    }

}

export default CompletedSession