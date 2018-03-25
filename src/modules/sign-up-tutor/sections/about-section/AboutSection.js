import React from 'react';
import {Form, Input, Grid, Header, Radio, Select, Button} from 'semantic-ui-react';
import './styles.css';
import * as moment from "moment/moment";
import {CountryList} from "../../../../helpers/utils";
import * as $ from 'jquery';
import Phone from 'react-phone-number-input'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'


export default class AboutSection extends React.Component {
    constructor() {
        super();
        // this.changeGender = this.changeGender.bind(this);
        this.changeDob = this.changeDob.bind(this);
    }

    state = {
        // gender: 'male',
        fileName:"",
        dobError: "",
         wrongEmail:false,
         wrongPassFormat:false,
         wrongPass:false,
         nextStep:false
    };
emailCheck() {
	

	let email=document.getElementById("email").value.trim();
	let confirm=document.getElementById("confirmEmail").value.trim();
	if(email==confirm){ this.setState({wrongEmail:false}); return true;}
	else{  this.setState( {wrongEmail:true}); return false;}
			
			}

		passwordCheck()
		{
			let pass=document.getElementById("password").value.trim()
			let confirm=document.getElementById("password_confirmation").value.trim()

			const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,]{8,}$/;
		if(re.test(pass)){
			
			this.setState({wrongPassFormat:false})
			
			
			if(pass!=="" && confirm!=="" && pass==confirm)
			{
				
				this.setState({wrongPass:false}); 
				return true;
				
			}
			else 
			{
				this.setState({wrongPass:true})
				return false;
			
			}
		}
		
		else {this.setState({wrongPassFormat:true});
			return false;}
	
		
		
		}
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

    uploadFile(e, key){
		this.setState({fileName:e.target.files[0].name+" (delete)"})
        console.log(e)
    }
setPhone(value)
{
	this.setState({value})
	this.props.setPhone(({value}))
}
clearFile()
{
	$("#embedpollfileinput").val("");
	this.setState({fileName:null});
	
}
continue(e)
	{
		
		let el;
	

		if(!this.props.data.country){ this.setState({selectCountry:"select your country"})
			el=document.querySelector("#country_container");
			$(el).trigger("click");
			e.preventDefault();
		}
		
		
		if( !this.emailCheck() || !this.passwordCheck()  || !this.props.data.country || 
		!this.props.data['first_name'] || !this.props.data['last_name'] || !this.props.data.city
		 ) this.setState({nextStep:false})
		 else this.setState({nextStep:true})
		 
		
		
	}
	nextStep(e)
	{
		
		if(this.state.nextStep) this.props.nextStep(e);
		else e.preventDefault();
	}
    render() {
        // const {gender} = this.state;
        return (
        <Form encType='application/json' onSubmit={this.nextStep.bind(this)}>
            <Grid>
                <Grid.Row centered style={{marginTop:"20px"}}>
                    <Grid.Column width={8} textAlign='left' >
                      <h4 class="ui dividing header">Personal Information</h4>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered >
                    <Grid.Column width={4} textAlign='left' >
                      <span> Name </span>
                        <Input fluid name='first_name' placeholder='First Name *' value={this.props.data.first_name} required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left' >
                      <br/>
                        <Input fluid name='last_name' placeholder='Last Name *' value={this.props.data.last_name} required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4} textAlign='left' >
                        <span>Date of Birth</span>
                        <Input id="datepicker" fluid name='dob'  type='date' value={this.props.data.dob}  placeholder='dd/mm/yyyy'
                               onFocus={this.onFocusChange}
                               onBlur={this.onFocusChange}
                               onChange={this.changeDob}
                                required />
                               
                        <p style={{color: 'red', fontSize: '15px'}}>{this.state.dobError}</p>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left' >
                      <span>Country</span>
                        <Select labeled={true} fluid name='country' value={this.props.data.country} id="country_container" onChange={this.props.onChange}
                                placeholder='Select your country *'  options={CountryList}  required/>
                        {/*<input fluid name='country' type='text' placeholder='Country' required*/}
                        {/*onChange={this.props.onChange}/>*/}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4} textAlign='left' >
                      <span>State/Province</span>
                        <Input fluid name='province' type='text' placeholder='State/Province *' value={this.props.data.province}  required
                               onChange={this.props.onChange}/>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left' >
                      <span>City</span>
                        <Input fluid name='city' type='text' placeholder='City *' value={this.props.data.city}  required
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
                      <Input fluid name='email' placeholder='Email' id="email" type='email' value={this.props.data.email}  onChange={this.props.onChange}/>
                 
                  </Grid.Column>
                  <Grid.Column width={4} textAlign='left'>
                      <span>Confirm Email</span>
                      <Input fluid name='ConfirmEmail' id="confirmEmail" placeholder='Confirm Email' type='email' value={this.props.data.ConfirmEmail}  onChange={this.props.onChange}/>
                  {this.state.wrongEmail  && <span style={{color:"red"}}> emails mismatch</span>}
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row centered  >
                    <Grid.Column width={4} textAlign='left' >
                      <span>Password</span>
                        <Input fluid name='password' id="password" type='password' placeholder='Password *' required
                               onChange={this.props.onChange}/>
                               {this.state.wrongPassFormat && <span style={{color:"red"}}> -Wrong format for password(at least one number, one lowercase, one uppercase )</span>}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left'>
                      <span>Confirm Password</span>
                        <Input fluid name='password_confirmation' id='password_confirmation' type='password' placeholder='Password Confirmation *'
                               required
                               onChange={this.props.onChange}/>
                                {this.state.wrongPass && <span style={{color:"red"}}> -Passwords are not the same </span>}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  <Grid.Column width={4} textAlign='left'>
                    <span>Phone</span>
                      <Phone
						placeholder="Enter phone number"
						country="CA"
						value={ this.state.value}
						
						onChange={this.setPhone.bind(this)  }/>
                              {/* (change)="fileEvent($event)" */}
                  </Grid.Column>
                    <Grid.Column width={3} textAlign='left' style={{ marginTop:"20px"}}>
                        <Input type="file" class="inputfile" id="embedpollfileinput" onChange={this.uploadFile.bind(this)}/>
                       
                        <label for="embedpollfileinput" class="ui small red left floated button">
                        
                          <i class="ui upload icon"></i>
                          Upload ID
                        </label>
                        <br />
                       {this.state.fileName && <div class="ui small red left floated button" style={{clear:"both", textAlign:"left", marginTop:"3px"}} onClick={this.clearFile.bind(this)}><span>{this.state.fileName} </span></div>}
                    </Grid.Column>
                  <Grid.Column width={1} textAlign='left'>
                      <abbr title="Upload verification document(Passport, Driver License etc)" style={{border:"none"}}>
                        <Button className="circular basic teal" icon ="warning" style={{padding:"2px",marginTop:"25px"}}/>
                      </abbr>
                  </Grid.Column>
                </Grid.Row>
            </Grid>
             <div className="ui center aligned segment" style={{marginTop:"30px", border:"0"}}>
                    <Button color='olive'
                        onClick={this.continue.bind(this)}>Continue
                    </Button>
                  </div>
            </Form>
        );
    }
}
