
import React from 'react'
import swal from 'sweetalert'
import {connect} from 'react-redux';
import {history} from '../../redux/store';
import {sessionRequest} from '../../redux/actions';
import { Button, Grid, Segment,Icon,Loader,Dimmer } from 'semantic-ui-react'

class StepThree extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      password: '', 
      passwordConfirm: '' 
    }
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    this.handlePasswordConfirmChanged = this.handlePasswordConfirmChanged.bind(this);

  }

  handlePasswordChanged (event) {
    this.setState({password: event.target.value})
  }

  handlePasswordConfirmChanged (event) {
    this.setState({passwordConfirm: event.target.value})
  }

  appoint=async()=>{
    let booked_tutor = JSON.parse(localStorage.getItem("booked-tutor"));
    console.log("APPOINTED", booked_tutor)
    await this.props.sessionRequest(booked_tutor);
        console.log(this.props.BOOKEDSESSION)
        swal("Session Requested!", "Thank You!", "success");
        history.push('/dashboard/student')
  }

  render () {
    return (
      <div>
        <Grid centered columns={2}>
          <Grid.Column>
            <Button size='huge' onClick={this.appoint} className="appoint-btn" icon labelPosition='right'>
              Appoint
              <Icon name='right arrow' />
            </Button>
            {/* <Button className="appoint-btn">Appoint</Button> &nbsp; */}
          </Grid.Column>
        </Grid>
        
      </div>
    )
  }
}


const mapStateToProps = ({auth, dashboard}) => {
  const {TUTOR_AVAILABILITY, BOOKEDSESSION} = dashboard;
  const {id, role, firstName, lastName} = auth;
  return {firstName, lastName, BOOKEDSESSION};
};


const mapActionToProps = () => {
  return {sessionRequest}
};



export default connect(mapStateToProps, mapActionToProps())(StepThree);