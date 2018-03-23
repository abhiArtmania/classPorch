import React from 'react';
import {Form, Grid, Header, Radio, Select, Button} from 'semantic-ui-react';
import './styles.css';
import * as moment from "moment/moment";
import {CountryList} from "../../../../helpers/utils";
import * as $ from 'jquery';

export default class AboutSection extends React.Component {
    constructor() {
        super();
        // this.changeGender = this.changeGender.bind(this);
        this.changeDob = this.changeDob.bind(this);
    }

    state = {
        // gender: 'male',
        dobError: ""
    };

    changeDob(e, {name, value}) {
        const age = moment(value).month(0).from(moment().month(0));
        const ageInYears = Number(age.match(/\d+/g));
        this.setState(Object.assign(this.state, {
            dob: value,
            needParent: ageInYears < 18,
            dobError: ageInYears < 18 ? "You must be 18 years old minimum" : ""
        }));
        this.props.onChange(e, {name, value})
    }

    // changeGender = function (e, {name, value}) {
    //     this.setState({gender: value});
    //     this.props.onChange(e, {name, value})
    // };

    onFocusChange = function (event, data) {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click();
        } else {
            event.target.type = 'text';
        }
    };

    startUploading(e) {
        console.log(e)
    }

    uploadFile(e){
        console.log(e)
    }

    render() {
        // const {gender} = this.state;
        return (
            <Grid>
                <Grid.Row centered style={{marginTop:"20px"}}>
                    <Grid.Column width={8} textAlign='left' >
                      <h4 class="ui dividing header">Personal Information</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered >
                    <Grid.Column width={4} textAlign='left' >
                      <span> Name </span>
                        <input fluid name='first_name' placeholder='First Name *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left' >
                      <br/>
                        <input fluid name='last_name' placeholder='Last Name *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4} textAlign='left' >
                        <span>Date of Birth</span>
                        <input id="datepicker" fluid name='dob'  type='date' placeholder='dd/mm/yyyy'
                               onFocus={this.onFocusChange}
                               onBlur={this.onFocusChange} required />
                               {/* onChange={this.changeDob} Implement this */}
                        <p style={{color: 'red', fontSize: '15px'}}>{this.state.dobError}</p>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left' >
                      <span>Country</span>
                        <Select labeled={true} fluid name='country' onChange={this.props.onChange}
                                placeholder='Select your country *' options={CountryList} required/>
                        {/*<input fluid name='country' type='text' placeholder='Country' required*/}
                        {/*onChange={this.props.onChange}/>*/}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4} textAlign='left' >
                      <span>State/Province</span>
                        <input fluid name='province' type='text' placeholder='State/Province *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left' >
                      <span>City</span>
                        <input fluid name='city' type='text' placeholder='City *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                {/* <Grid.Row centered  >
                    <Grid.Column width={12} textAlign='left'>
                        <span>Gender</span>
                        <Radio
                            label='Male'
                            name='gender'
                            value='male'
                            className='space'
                            checked={gender === 'male'}
                            onChange={this.changeGender}/>
                        <Radio
                            label='Female'
                            name='gender'
                            value='female'
                            className='space'
                            checked={gender === 'female'}
                            onChange={this.changeGender}/>
                    </Grid.Column>
                </Grid.Row> */}
                <Grid.Row centered  >
                  <Grid.Column width={4} textAlign='left'>
                      <span>Email</span>
                      <input fluid name='email' placeholder='Email' type='email' onChange={this.props.onChange}/>
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='left'>
                      <span>Confirm Email</span>
                      <input fluid name='ConfirmEmail' placeholder='Confirm Email' type='email' onChange={this.props.onChange}/>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered  >
                    <Grid.Column width={4} textAlign='left' >
                      <span>Password</span>
                        <input fluid name='password' type='password' placeholder='Password *' required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left'>
                      <span>Confirm Password</span>
                        <input fluid name='password_confirmation' type='password' placeholder='Password Confirmation *'
                               required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  <Grid.Column width={4} textAlign='left'>
                    <span>Phone</span>
                      <input fluid name='phone' type='tel'
                        placeholder='Phone *' required
                             onChange={this.props.onChange}/>
                              {/* (change)="fileEvent($event)" */}
                  </Grid.Column>
                    <Grid.Column width={3} textAlign='left' style={{ marginTop:"20px"}}>
                        <input type="file" class="inputfile" id="embedpollfileinput" />
                        <label for="embedpollfileinput" class="ui small red left floated button">
                          <i class="ui upload icon"></i>
                          Upload ID
                        </label>
                    </Grid.Column>
                  <Grid.Column width={1} textAlign='left'>
                      <abbr title="Upload verification document(Passport, Driver License etc)" style={{border:"none"}}>
                        <Button className="circular basic teal" icon ="warning" style={{padding:"2px",marginTop:"25px"}}/>
                      </abbr>
                  </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}
