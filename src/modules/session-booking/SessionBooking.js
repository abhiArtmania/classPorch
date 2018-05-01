// 'use strict'
import React, { Component } from 'react';
import { Icon, Step, Button, Card } from 'semantic-ui-react'
import {connect} from 'react-redux';
// import MultiStep from 'react-multistep';
// import { steps } from './src/index.js'

import a from './css/normalize.css';
// import b from './css/skeleton.css';
import c from './css/custom.css';
import d from './css/prog-tracker.css';

import { StepOne } from './StepOne'
import StepTwo from './StepTwo'
import  StepThree  from './StepThree'


var styles = {
  container: {
    width: '90%', //changed from 70
    // backgroundColor: 'red',
    marginTop: '30px',
    marginBottom: '40px',
  },
  multistep: {
    width: '60%', //changed from 60
    margin: '0 auto',
    // backgroundColor: 'yellow'
  },
  button: {

      color: 'white !important',
       margin: '15px 0 !important',
       padding: '15px 30px !important',
       background: 'orange !important',
       transition: 'all ease .3s',
  },
  card: {
    width: '100%', //changed from 110
    margin: '0 auto'
  }
}


class SessionBooking extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        tutorId: props.route.match.params.tutorId
      }

    }

    
  

  render() {
    console.log(this.props.TUTORINFO);
    const steps = [
      {name: 'Subject', component: <StepOne tutorSkills={this.props.TUTORINFO.skills}/>},
      {name: 'Date & Time', component: <StepTwo tutorId={this.state.tutorId}/>},
      {name: 'Confirm', component: <StepThree/>},
      // {name: 'StepFour', component: <StepFour/>}
    ]
      return (
        <div className="container" style={styles.container}>
        <div style={styles.multistep}>
          <MultiStep steps={steps}/>
        </div>
      </div>
      );
    }
  }
  



  const mapStateToProps = ({auth, dashboard}) => {
    const {CATEGORIES,TUTORINFO} = dashboard;
    const {id, role, firstName, lastName} = auth;
    return {firstName, lastName, CATEGORIES,TUTORINFO};
  };

  // const mapActionToProps = () => {
  //   return {getCategories,submitTicket}
  // };
  
  
  
  export default connect(mapStateToProps, null)(SessionBooking);


// export default SessionBooking;















class MultiStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: this.getNavStates(0, this.props.steps.length)
    };
    this.hidden = {
      display: 'none'
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  getNavStates(indx, length) {
    let styles = [];
    for (let i=0; i<length; i++) {
      if(i < indx) {
        styles.push('done')
      }
      else if(i === indx) {
        styles.push('doing')
      }
      else {
        styles.push('todo')
      }
    }
    return { current: indx, styles: styles }
  }

  checkNavState(currentStep){
    if(currentStep > 0 && currentStep < this.props.steps.length - 1){
      this.setState({
        showPreviousBtn: true,
        showNextBtn: true
      })
    }
    else if(currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true
      })
    }
    else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false
      })
    }
  }

  setNavState(next) {
    this.setState({navState: this.getNavStates(next, this.props.steps.length)})
    if (next < this.props.steps.length) {
      this.setState({compState: next})
    }
    this.checkNavState(next);
  }

  handleKeyDown(evt) {
    if (evt.which === 13) {
      this.next()
    }
  }

  handleOnClick(evt) {
    if (evt.currentTarget.value === (this.props.steps.length - 1) &&
      this.state.compState === (this.props.steps.length - 1)) {
      this.setNavState(this.props.steps.length)
    }
    else {
      this.setNavState(evt.currentTarget.value)
    }
  }

  next() {
    this.setNavState(this.state.compState + 1)
  }

  previous() {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  }

  getClassName(className, i){
    return className + "-" + this.state.navState.styles[i];
  }

  renderSteps() {
    return this.props.steps.map((s, i)=> (
      <li style={{width: '31%'}} className={this.getClassName("progtrckr", i)} onClick={this.handleOnClick} key={i} value={i}>
        <em>{i+1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));
  }

  render() {

    return (

      <Card style={styles.card}>
        <Card.Content header='Book A Session' />
        <Card.Content >
         <div className="container" onKeyDown={this.handleKeyDown}>
            <ol className="progtrckr">
              {this.renderSteps()}
            </ol>
            {this.props.steps[this.state.compState].component}
            <div className="prevNextButtons">
            <div style={this.props.showNavigation ? {} : this.hidden}>
              <Button disabled={this.state.showPreviousBtn ? false : true} 
                      className="next-btn"
                      onClick={this.previous}>Previous</Button>
                      &nbsp; 
              <Button floated='right' disabled={this.state.showNextBtn ? false : true} 
                      className="next-btn"
                      onClick={this.next}>Next</Button>
            </div>
            </div>
          </div>
        </Card.Content >
        <Card.Content extra>
          <Icon name='calendar' />
          
        </Card.Content>
      </Card>


      // <div className="container" onKeyDown={this.handleKeyDown}>
      //   <ol className="progtrckr">
      //     {this.renderSteps()}
      //   </ol>
      //   {this.props.steps[this.state.compState].component}
      //   <div style={this.props.showNavigation ? {} : this.hidden}>
      //     <Button style={this.state.showPreviousBtn ? {} : this.hidden}
      //             className="session-booking-btn"
      //             onClick={this.previous}>Previous</Button>
      //             &nbsp; 
      //     <Button floated='right' style={this.state.showNextBtn ? {} : this.hidden}
      //             className="session-booking-btn"
      //             onClick={this.next}>Next</Button>
      //   </div>
      // </div>
    );
  }
}

MultiStep.defaultProps = {
  showNavigation: true
};


