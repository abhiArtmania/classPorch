'use strict'
import React from 'react'
import { Button, Checkbox, Form, Grid, Segment, TextArea,Icon,Dropdown,Loader,Dimmer } from 'semantic-ui-react'


var styles = {
    container: {
        width: '65%',
        // backgroundColor: 'red',
        margin: '0 auto'
    }
}
export class StepOne extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      firstName: '', 
      lastName: '',
      skills: '',
      selected_skill_id: '',
      friendOptions: [
          {
            text: 'HTML',
            value: 'HTML',
          },
          {
            text: 'CSS',
            value: 'CSS',
          },
          {
            text: 'Javascript',
            value: 'Javascript',
          },
        ],
        dropdown: {
            width: '80%'
        }
       
    }
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
  }

  handleFirstNameChanged (event) {
    this.setState({firstName: event.target.value})
  }

  handleLastNameChanged (event) {
    this.setState({lastName: event.target.value})
  }
  setValue(e, data) {
    this.setState({ selected_skill_id: data.value },()=>{
      console.log("SKILL ID: "+this.state.selected_skill_id)
      localStorage.setItem("skill_id",JSON.stringify(this.state.selected_skill_id))
    })
  }

  componentDidMount(){
    console.log(this.props.tutorSkills)
    if(this.props.tutorSkills) this.setState({ 
      skills: this.props.tutorSkills.map(x => {
          return { key:x.id, text:x.name, value:x.id }
      })   
  })
  }

  render () {
    return (
      <div style={styles.container}>
  
            <h4>Please Select the Subject</h4>
            <Dropdown style={styles.dropdown} onChange={this.setValue.bind(this)} value={this.state.seletcted_skill_id}  placeholder='Category' fluid search selection multiple options={this.state.skills}/>
      </div>
    )
  }
}