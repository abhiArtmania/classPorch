import React from 'react';
import BottomSection from './BottomSection';
import SkillsSection from './SkillsSection';
import HourlyRateSection from './HourlyRateSection';
import {Button, Form, Grid, Header, Input} from 'semantic-ui-react';
import moment from 'moment';
import './styles.css';
import * as $ from 'jquery';
export default class EducationSection extends React.Component {

    constructor() {
        super();
        this.state = {
            loadedFiles:[],
            selectedSkills: [],
            numberOfEducationFields: 1,
            agreeMessage:false,
			proceed:false,
        };
        this.renderEduction = this.renderEduction.bind(this);
        this.onEducationChange = this.onEducationChange.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);

    }
	uploadFile(key,e){
		let tmp=[...this.state.loadedFiles];
		
		tmp[key]=e.target.files[0].name+" (delete)"
		this.setState({loadedFiles:tmp})
      
    }
    clearFile(key)
{
	$("#embedpollfileinput_"+key).val("");
	let tmp=[...this.state.loadedFiles];
		tmp[key]=null
		this.setState({loadedFiles:tmp})

	
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

    addEducation(key) {
        let tmp=[...this.props.data.listOfEducation];
        
        tmp.splice(key+1,0,{})
       
        this.props.setListOfEducation(tmp)
        let tmp2=[...this.state.loadedFiles];
		tmp2.splice(key+1,0,null)
		this.setState({loadedFiles:tmp2})
    }
    deleteEducation(key) {
        let tmp=[...this.props.data.listOfEducation];
        tmp.splice(key,1)
        this.props.setListOfEducation(tmp)
        let tmp2=[...this.state.loadedFiles];
		tmp2.splice(key,1)
		this.setState({loadedFiles:tmp2})
    }

    onEducationChange(key, e, {name, value}) {
        let educations = [...this.props.data.listOfEducation];
        educations[key][name] = value;  //new value
        this.props.setListOfEducation(educations);
        this.props.onChangeEdu(this.props.data.listOfEducation)
    }

    startUploading() {

    }

    renderEduction() {
        return this.props.data.listOfEducation.map((edu, key) => {
			const university=(this.props.data.listOfEducation[key]['university_name'])? this.props.data.listOfEducation[key]['university_name'] : "";
			const start=(this.props.data.listOfEducation[key]['start_education'] )? this.props.data.listOfEducation[key]['start_education'] : "";
			const finish=(this.props.data.listOfEducation[key]['finish_education'] )? this.props.data.listOfEducation[key]['finish_education'] : "";
            const id="embedpollfileinput_"+key;
            return <Grid key={key}>
                      <Grid.Row centered style={{marginTop:"10px"}}>
                        <Grid.Column width={4} textAlign='left'>
                          <span>School Name{key}{university}</span>
                            <Input fluid type='text' name={'university_name'} placeholder='Name of School'
                            value={university}
                                   onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='left'>
                          <span>Start</span>
                            <Input fluid name={'start_education'} type='text' placeholder='(dd/mm/yyyy)'
                                   onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                                   value={start}
                                   onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='left'>
                          <span>End</span>
                            <Input fluid name={'finish_education'} type='text' placeholder='(dd/mm/yyyy)'
                                   onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                                   value={finish}
                                   onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row centered textAlign="left">
                          <Grid.Column width={4} textAlign='left'>
                            <span style={{fontWeight:"bold"}}>Upload Degree/Diploma/Transcript</span>
                         </Grid.Column>
                         <Grid.Column width={4} textAlign='left'>
                           {/* info button */}
                           <abbr title="Upload verification document(Passport, Driver License etc)" style={{border:"none"}}>
                             <Button className="circular basic teal" icon ="warning" style={{padding:"2px",marginTop:"10px"}}/>
                           </abbr>
                           {/* upload button */}
                           <input type="file" class="inputfile" id={id} onChange={this.uploadFile.bind(this,key)}/>
                           <label for={id} class="ui small right floated red button">
                             <i class="ui upload icon"></i>
                             Upload Doc
                           </label>
                           
                           {this.state.loadedFiles[key] && <div class="ui small red left floated button" style={{clear:"both", float:"right", marginTop:"3px"}} onClick={this.clearFile.bind(this,key)}><span>{this.state.loadedFiles[key]} </span></div>}
                         </Grid.Column>
                         </Grid.Row>
                        
                         <Grid.Row centered textAlign="right">
                          <Grid.Column width={8}>
                          
                            <Button floated="right" size="small" type="button" onClick={this.deleteEducation.bind(this,key)}>Delete Education</Button>
                            <Button floated="right" size="small" type="button" onClick={this.addEducation.bind(this,key)}>Add Education</Button>
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
continue(e)
{
		
	if(this.state.proceed==true) this.setState({agreeMessage:false })
	else {this.setState({agreeMessage:true }); e.preventDefault();}
}
isAgreedToTerms(bool)
{
	if(bool===true) this.setState({proceed:true, agreeMessage:false })
	else this.setState({proceed:false})
}
    render() {
        return (
          <Form encType='application/json' onSubmit={this.props.onFormSubmitted}>
            <Grid>
                <Grid.Row centered style={{marginTop:"20px"}}>
                    <Grid.Column width={8} textAlign='left'>
                      <h4 class="ui dividing header">Education</h4>
                    </Grid.Column>
                </Grid.Row>
</Grid>
                {this.renderEduction()}
<Grid>
                <Grid.Row centered>
                    <Grid.Column width={8} textAlign='left'>
                      <span>Experience</span>
                        <Input required fluid name='experience' value={this.props.data.experience} placeholder='Experience (in years)'
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <SkillsSection onChangeSkills={this.props.onChangeSkills} selectedSkills={this.props.selectedSkills}/>
                <HourlyRateSection/>
                <BottomSection isAgreedToTerms={this.isAgreedToTerms.bind(this)} agreeMessage={this.state.agreeMessage}/>
            </Grid>
            <div className="ui center aligned segment" style={{marginTop:"30px", border:"0"}}>
                    <Button color='olive'
                        onClick={this.props.goBack}>back
                    </Button>
                 
                    <Button color='olive'
                        onClick={this.continue.bind(this)}>Submit
                    </Button>
                  </div>
                  
            </Form>
        );
    }
}
