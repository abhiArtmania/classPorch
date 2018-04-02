import React from 'react'
import { Grid, Icon, Table} from 'semantic-ui-react'
import './styles.css';

import { Menu, Dropdown, Image, Input, Button } from 'semantic-ui-react';

class completedSession extends React.Component {

    constructor() {
        super();
        this.state = {
            NotificationList: [
                {id:6, Date: 'Mar-2018', Notification: 'Hello this is first notification' },
                {id:7, Date: 'Mar-2018', Notification: 'Hello this is second notification' },
                {id:8, Date: 'Mar-2018', Notification: 'Hello this is third notification' },
                {id:9, Date: 'Apr-2018', Notification: 'Hello this is forth notification' },
                {id:10, Date: 'Apr-2018', Notification: 'Hello this is five notification' },
                {id:2, Date: 'Jan-2018', Notification: 'Hello this is first notification' },
                {id:1, Date: 'Jan-2018', Notification: 'Hello this is second notification' },
                {id:3, Date: 'Feb-2018', Notification: 'Hello this is third notification' },
                {id:4, Date: 'Feb-2018', Notification: 'Hello this is forth notification' },
                {id:5, Date: 'Feb-2018', Notification: 'Hello this is five notification' },
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
    

    renderTodos(){
        let nlist=this.state.NotificationList.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
        console.log(this.state.limit);
        return nlist.slice(0,this.state.limit).map((p)=>{
            return(
                <Table.Row key={p.id}>
                <Table.Cell> <Icon name='delete' color='yellow' size='large' /></Table.Cell>
                <Table.Cell>{p.Date}</Table.Cell>
                <Table.Cell>{p.Notification}</Table.Cell>
                
            </Table.Row>
            );
        });
    };
    render() {
        let nlist=this.state.NotificationList.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
        let list = nlist.map(p => {

            return (
                <Table.Row>
                    <Table.Cell> <Icon name='delete' color='yellow' size='large' /></Table.Cell>
                    <Table.Cell>{p.Date}</Table.Cell>
                    <Table.Cell>{p.Notification}</Table.Cell>
                    
                </Table.Row>
            );
        });

        return (
            <Grid className='tutor-notification-section'>
                <Grid.Row centered textAlign='left'>
                    <Grid.Column width={15}>
                        <p className='notifications-header'>Notifications</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={15}>
                        <Table basic='very'>
                            <Table.Body>
                            {this.renderTodos()}
               
                            </Table.Body>   
                        </Table>
                        <Button color='yellow'  onClick={this.onLoadMore.bind(this)}>Load More</Button>
                      
                    </Grid.Column> 
                </Grid.Row>
            </Grid>
           
        )
    }

}

export default completedSession