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
			proceed:false
			
        };
        this.renderEduction = this.renderEduction.bind(this);
        this.onEducationChange = this.onEducationChange.bind(this);
        this.onChangeSkills = this.onChangeSkills.bind(this);

    }
	
    clearFile(key)
{
	
	 let educations = [...this.props.data.listOfEducation];
        educations[key]["verification_document"] = null;  //new value
        this.props.setListOfEducation(educations);
        this.props.onChangeEdu(this.props.data.listOfEducation)
	/*$("#embedpollfileinput_"+key).val("");
	let tmp=[...this.state.loadedFiles];
		tmp[key]=null
		this.setState({loadedFiles:tmp})*/

	
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
        /*let tmp2=[...this.state.loadedFiles];
		tmp2.splice(key+1,0,null)
		this.setState({loadedFiles:tmp2})*/
    }
    deleteEducation(key) {
		if(this.props.data.listOfEducation.length===1) return;
        let tmp=[...this.props.data.listOfEducation];
        tmp.splice(key,1)
        this.props.setListOfEducation(tmp)
        /*let tmp2=[...this.state.loadedFiles];
		tmp2.splice(key,1)
		this.setState({loadedFiles:tmp2})*/
    }

    onEducationChange(key, e, {name, value}) {
		$("#file_error_"+key).text(''); 
        let educations = [...this.props.data.listOfEducation];
        educations[key][name] = value;  //new value
        if(e.target.files) educations[key][name]=e.target.files[0]
        this.props.setListOfEducation(educations);
        this.props.onChangeEdu(this.props.data.listOfEducation)
    }

    startUploading() {

    }

    renderEduction() {
		const a=<span style={{color:"red"}}>*</span>
        return this.props.data.listOfEducation.map((edu, key) => {
			const university=(this.props.data.listOfEducation[key]['university_name'])? this.props.data.listOfEducation[key]['university_name'] : "";
			const start=(this.props.data.listOfEducation[key]['start_education'] )? this.props.data.listOfEducation[key]['start_education'] : "";
			const finish=(this.props.data.listOfEducation[key]['finish_education'] )? this.props.data.listOfEducation[key]['finish_education'] : "";
			const file=(this.props.data.listOfEducation[key]['verification_document'] )? this.props.data.listOfEducation[key]['verification_document'] : "";
            const filename=(file.name)? file.name: null
            const id="embedpollfileinput_"+key;
            const errId="file_error_"+key; 
           
            console.log(key);
            return <Grid key={key}>
                      <Grid.Row centered style={{marginTop:"10px"}}>
                        <Grid.Column width={4} textAlign='left'>
                          <span>School Name{a}</span>
                            <Input fluid type='text' name={'university_name'} required  placeholder='Name of School'
                            value={university}
                                   onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='left'>
                          <span>Start{a}</span>
                            <Input fluid name={'start_education'} type='text' placeholder='(dd/mm/yyyy)'
                                   onFocus={this.onFocusChange} min='1970-01-01' max={moment().format('Y-mm-D')}
                                   value={start}
                                   onBlur={this.onFocusChange} required onChange={this.onEducationChange.bind(this, key)}/>
                        </Grid.Column>
                        <Grid.Column width={2} textAlign='left'>
                          <span>End{a}</span>
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
                           <abbr title="Please upload your Driver’s License or Passport document to verify your identity" style={{border:"none"}}>
                             <Button className="circular basic " type="button" icon ="warning" style={{padding:"2px",marginTop:"10px"}}/>
                           </abbr>
                           {/* upload button */}
                           <Input type="file" name={'verification_document'}  required  class="inputfile" id={id}  onChange={this.onEducationChange.bind(this, key)}/>
                           <label for={id} class="ui small right floated yellow button">
                             <i class="ui upload icon"></i>
                             Upload Doc
                           </label>
                           <div id={errId} style={{color:"red", clear:"both",float:"right"}} />
                           {this.props.data.listOfEducation[key]['verification_document'] && (<div  style={{position:"relative", clear:"both", marginTop:"3px", border:"1px solid white", marginTop:"2px", backgroundColor:"beige", padding:"15px", wordWrap:"break-word", borderRadius:"5px"}} >{filename}<div className="closeIcon" onClick={this.clearFile.bind(this,key)}>✖</div></div>)}
                         </Grid.Column>
                         </Grid.Row>
                        
                         <Grid.Row centered textAlign="right">
                          <Grid.Column width={8}>
                          
                           {key>0 && <Button floated="right" size="small" type="button" onClick={this.deleteEducation.bind(this,key)}>Delete Education</Button> } 
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
	this.props.data.listOfEducation.forEach(function(item,i)
	{
		if(!item.verification_document){ 
			let v=$("#file_error_"+i);
			v.text("upload file");
			v.get(0).scrollIntoView(true);
			window.scrollBy(0,-100)
  
			 e.preventDefault();
		 }
	}
	
	)
	if(!this.props.selectedSkills.length)
	{ $("#skills_dropdown").trigger('click');
	  e.preventDefault();
		}
	if(this.state.proceed==true) this.setState({agreeMessage:false })
	else {this.setState({agreeMessage:true }); e.preventDefault();}
}
isAgreedToTerms(bool)
{
	if(bool===true) this.setState({proceed:true, agreeMessage:false })
	else this.setState({proceed:false})
}
    render() {
		const a=<span style={{color:"red"}}>*</span>
        return (
          <Form encType='application/json' onSubmit={this.props.onFormSubmitted}>
            <Grid>
                <Grid.Row centered style={{marginTop:"20px"}}>
                    <Grid.Column width={8} textAlign='left'>
                      <h4 class="ui dividing header">Education{a}</h4>
                    </Grid.Column>
                </Grid.Row>
</Grid>
                {this.renderEduction()}
<Grid>
                <Grid.Row centered>
                    <Grid.Column width={8} textAlign='left'>
                      <span>Experience{a}</span>
                        <Input required fluid name='experience' value={this.props.data.experience} placeholder='Experience (in years)'
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <SkillsSection onChangeSkills={this.props.onChangeSkills} selectedSkills={this.props.selectedSkills}/>
                <HourlyRateSection onChange={this.props.onChange} data={this.props.data}/>
                <BottomSection isAgreedToTerms={this.isAgreedToTerms.bind(this)} agreeMessage={this.state.agreeMessage}/>
            </Grid>
            <div className="ui center aligned segment" style={{marginTop:"30px", border:"0"}}>
            <div style={{margin:"0 auto", color:"red", textAlign:"center"}}>{this.props.errorMessage}</div>
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
