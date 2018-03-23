import React from 'react';
import BottomSection from './BottomSection';
import SkillsSection from './SkillsSection';
import HourlyRateSection from './HourlyRateSection';
import {Button, Form, Grid, Header, Input} from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';

export default class EducationSection extends React.Component {

    constructor() {
        super();
        this.state = {
            listOfEducation: [{}],
            selectedSkills: [],
            numberOfEducationFields: 1
        };
        this.renderEduction = this.renderEduction.bind(this);
        this.onEducationChange = this.onEducationChange.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);

    }

    onFocusChange = (event, data) => {
        if (event.type === 'focus') {
            event.target.type = 'date';
            event.target.click()
        } else {
            event.target.type = 'text'
        }
    };

    onChangeSkills = (selectedSkills) => {
        this.setState({selectedSkills})
    };

    getEducations = () => {
        const {startDate, endDate, numberOfEducationFields} = this.state;
        const Educations = [];

        for (let i = 0; i < numberOfEducationFields; i++) {
            Educations.push(
                <Grid>

                </Grid>
            )
        }
        return Educations;
    };

    addEducation(e) {
        e.preventDefault();
        this.setState({listOfEducation: [{}, ...this.state.listOfEducation]})
    }

    onEducationChange(key, e, {name, value}) {
        let educations = [...this.state.listOfEducation];
        educations[key][name] = value;  //new value
        this.setState({listOfEducation: educations});
        this.props.onChangeEdu(this.state.listOfEducation)
    }

    startUploading() {

    }
    renderEduction() {
        return this.state.listOfEducation.map((edu, key) => {
            return <Grid key={key}>
                      <Grid.Row centered style={{marginTop:"10px"}}>
                        <Grid.Column width={4} textAlign='left'>
                          <span>School Name</span>
                            <input fluid type='text' name={'university_name'} placeholder='Name of School'
                                   onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='left'>
                          <span>Start</span>
                            <input fluid name={'start_education'} type='text' placeholder='(dd/mm/yyyy)'
                                   onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                                   onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='left'>
                          <span>End</span>
                            <input fluid name={'finish_education'} type='text' placeholder='(dd/mm/yyyy)'
                                   onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                                   onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row centered textAlign="left">
                          <Grid.Column width={3} textAlign='left'>
                            <span style={{fontWeight:"bold"}}>Upload Degree/Diploma/Transcript</span>
                         </Grid.Column>
                         <Grid.Column width={3} textAlign='left'>
                           {/* info button */}
                           <abbr title="Upload verification document(Passport, Driver License etc)" style={{border:"none"}}>
                             <Button className="circular basic teal" icon ="warning" style={{padding:"2px",marginTop:"10px"}}/>
                           </abbr>
                           {/* upload button */}
                           <input type="file" class="inputfile" id="embedpollfileinput" />
                           <label for="embedpollfileinput" class="ui small right floated red button">
                             <i class="ui upload icon"></i>
                             Upload Doc
                           </label>
                         </Grid.Column>
                         <Grid.Column width={2}>
                            <Button floated="right" size="small" onClick={this.addEducation.bind(this)}>Add Education</Button>
                             {/* <input fluid name={'finish_education'} type='text' placeholder='(dd/mm/yyyy)'
                                    onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                                    onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/> */}
                         </Grid.Column>
                        {/* Upload doc                style={{ marginTop:"20px"}}*/}
                        {/* <Grid.Column width={4} textAlign="left">
                            <input type="file" class="inputfile" id="embedpollfileinput" />
                            <label for="embedpollfileinput" class="ui small red button">
                              <i class="ui upload icon"></i>
                              Upload image
                            </label>
                        </Grid.Column>
                      <Grid.Column width={1} textAlign="left">
                          <abbr title="Upload verification document(Passport, Driver License etc)" style={{border:"none"}}>
                            <Button className="circular basic teal" icon ="warning" style={{padding:"2px",marginTop:"25px"}}/>
                          </abbr>
                      </Grid.Column>
                          <Grid.Column width={4} textAlign="left">
                            <Button onClick={this.addEducation.bind(this)}>Add Education</Button>
                          </Grid.Column> */}
                      </Grid.Row>
                </Grid>
        })
    }

    render() {
        return (
            <Grid>
                <Grid.Row centered style={{marginTop:"20px"}}>
                    <Grid.Column width={8} textAlign='left'>
                      <h4 class="ui dividing header">Education</h4>
                    </Grid.Column>
                </Grid.Row>

                {this.renderEduction()}

                <Grid.Row centered>
                    <Grid.Column width={8} textAlign='left'>
                      <span>Experience</span>
                        <input required fluid name='experience' placeholder='Experience (in years)'
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <SkillsSection onChangeSkills={this.onChangeSkills} selectedSkills={this.state.selectedSkills}/>
                <HourlyRateSection/>
                <BottomSection/>
            </Grid>
        );
    }
}
