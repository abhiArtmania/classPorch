'use strict'
import React from 'react'
// import Calendar from 'react-calendar/dist/entry.nostyle'
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import {getAvailability, bookedTutor} from '../../redux/actions';
import { StepThree } from './StepThree'

import Calendar from 'react-calendar';
import {Grid, Segment, Image, Dimmer, Loader, List, Button} from 'semantic-ui-react'



var styles = {
  container: {
      width: '100%',
      backgroundColor: 'red',
      margin: '0 auto'
  }
}

class StepTwo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      days: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
      email: '',
      emailConfirm: '',
      date: new Date(),
      schedule: '',
      loading: false,
      startSearchingAvailability: false,

      response: [
        { start_time: '13:00 PM', end_time: '18:00 PM' },
        { start_time: '13:00 PM', end_time: '18:00 PM' },
        { start_time: '13:00 PM', end_time: '18:00 PM' },
        { start_time: '13:00 PM', end_time: '18:00 PM' },
        { start_time: '13:00 PM', end_time: '18:00 PM' },
        { start_time: '13:00 PM', end_time: '18:00 PM' },
        { start_time: '13:00 PM', end_time: '18:00 PM' },
        
      ]
        
    }
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
    this.handleEmailConfirmChanged = this.handleEmailConfirmChanged.bind(this);
  }

  componentDidMount=async() => 
  {
    // await this.props.getAvailability(this.props.tutorId);
    await this.props.getAvailability(this.props.tutorId);
    if(this.props.TUTOR_AVAILABILITY) this.setState({ schedule: this.props.TUTOR_AVAILABILITY }, ()=>{
      this.setState({loading: false})
    })
    
  }

  setTime = (start_time, end_time, tutor_schedule_id,e) => {
    let skill_id = JSON.parse(localStorage.getItem("skill_id"));
    let body = {
      tutor_id: this.props.tutorId,
      skill: {
         id: skill_id
      },
      start_time,
      end_time,
      tutor_schedule_id
    }
    console.log(body)

    // let timeSegment = document.getElementById("time-segment");
    // timeSegment.style.backgroundColor = '#FFA500';
    let timeSegment = document.getElementsByName("time-segment");
    timeSegment.forEach(element => {
      element.removeAttribute("style");
    });
    e.target.style.backgroundColor = '#FFA500'
    e.target.style.color = 'white'
    e.target.style.border = 'inset'
    localStorage.setItem("booked-tutor", JSON.stringify(body));
  }


  handleEmailChanged (event) {
    this.setState({email: event.target.value})
  }

  handleEmailConfirmChanged (event) {
    this.setState({emailConfirm: event.target.value})
  }

  onChange = date => this.setState({ date },()=>{
    this.setState({startSearchingAvailability: true})
    this.setState({loading: true})
    console.log(this.state.date)
    let selectedDay = this.state.days[this.state.date.getDay()];
    // this.setState({selectedDay: selectedDay});

    if(this.props.TUTOR_AVAILABILITY) {
      // let hourlySchedule = [];
      // let s = this.props.TUTOR_AVAILABILITY[selectedDay];
      // console.log("s",s);
      // s.forEach(element => {
      //   let start = element.start_time.substring(0, 2);
      //   start = Number(start)
      //   let end = element.end_time.substring(0, 2);
      //   end = Number(end)
      //   console.log(start)
      //   let timeArray = [];
      //   for (let i = start; i <= end; i++) {
      //     timeArray.push(i)
      //   }
      //   console.log(timeArray);
      // });


      this.setState({ schedule: this.props.TUTOR_AVAILABILITY[selectedDay] }, ()=>{
      this.setState({loading: false})
    })
  }

  })

  render () {
    console.log(this.props.TUTOR_AVAILABILITY)
    return (
  
    <Grid centered columns={2}>
      <Grid.Column>
      <Calendar
            onChange={this.onChange}
            value={this.state.date}
            />
      </Grid.Column>

      <Grid.Row centered columns={6}>

      
    { (this.state.startSearchingAvailability) ? (

      // {

        (this.state.loading) ? 
        (<Dimmer active inverted> <Loader inverted>Searching</Loader></Dimmer>) : 
        (
          this.state.schedule.map((time)=>{
          return <Grid.Column style={{marginBottom: '20px'}} width={3}>
          <Segment name = "time-segment" onClick={this.setTime.bind(this,time.start_time,time.end_time,time.id)}>{time.start_time} {time.end_time}</Segment>
        </Grid.Column>
        })
      )
     
        
      // }
    ) : (<div></div>)

    }
      </Grid.Row>

    </Grid>


    )
  }
}

const mapStateToProps = ({auth, dashboard}) => {
  const {TUTOR_AVAILABILITY} = dashboard;
  const {id, role, firstName, lastName} = auth;
  return {firstName, lastName, TUTOR_AVAILABILITY};
};

const mapActionToProps = () => {
  return {getAvailability,bookedTutor}
};



export default connect(mapStateToProps, mapActionToProps())(StepTwo);

