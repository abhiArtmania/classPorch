import React from 'react';
import {Dropdown, Grid, Input, Radio, Select, Form, Button } from 'semantic-ui-react';
import * as moment from 'moment';
import './styles.css';
import { CountryList } from "../../../../helpers/utils";
import $ from 'jquery';

export default class AboutSection extends React.Component {

    constructor() {
        super();

        
        this.changeProvince = this.changeProvince.bind(this);
         this.onSelectChange = this.onSelectChange.bind(this);
        this.state = {
            password: '',
            email:false,
            selectCountry:"",
            colorE:"white",
            colorP:"white",
            password:false,
            wrongFormat:false,
            wrongEmail:false,
            wrongPassFormat:false,
            wrongPass:false,
            emailErrorsVisible:false,
           passwordErrorsVisible:false,
            gradesList: [
                { key: 'Grade 1', value: '1', text: 'Grade 1' },
                { key: 'Grade 2', value: '2', text: 'Grade 2' },
                { key: 'Grade 3', value: '3', text: 'Grade 3' },
                { key: 'Grade 4', value: '4', text: 'Grade 4' },
                { key: 'Grade 5', value: '5', text: 'Grade 5' },
                { key: 'Grade 6', value: '6', text: 'Grade 6' },
                { key: 'Grade 7', value: '7', text: 'Grade 7' },
                { key: 'Grade 8', value: '8', text: 'Grade 8' },
                { key: 'Grade 9', value: '9', text: 'Grade 9' },
                { key: 'Grade 10', value: '10', text: 'Grade 10' },
                { key: 'Grade 11', value: '11', text: 'Grade 11' },
                { key: 'Grade 12', value: '12', text: 'Grade 12' },
                { key: 'Year 1', value: '13', text: 'Year 1' },
                { key: 'Year 2', value: '14', text: 'Year 2' },
                { key: 'Year 3', value: '15', text: 'Year 3' },
                { key: 'Year 4', value: '16', text: 'Year 4' },
            ],
            showParents:false
        };


      
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
     }

     /*emailChange(e) {
	let email=document.getElementById("email")
	let confirm=document.getElementById("cmail")
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(String(e.target.value).toLowerCase()) &&
		email.value.trim()!=="" && confirm.value.trim()!=="" && email.value.trim()==confirm.value.trim()
		){		
			this.setState({email:true});
			this.props.onChange(e);
			}
			else this.setState({email:false});
		}
		emailBlur(e) {
	let email=document.getElementById("email")
	let confirm=document.getElementById("cmail")
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(re.test(String(e.target.value).toLowerCase())){
			
			this.setState({wrongFormat:false})
			
			if(email.value.trim()!=="" && confirm.value.trim()!=="" && email.value.trim()==confirm.value.trim()) this.setState({wrongEmail:false}); 
			else this.setState({wrongEmail:true}) 
			
		}
		
		else this.setState({wrongFormat:true});
	
		
		}*/
emailChange(e) {
	this.setState({colorE:"white"})
	let email=document.getElementById("email")
	let confirm=document.getElementById("cmail")
	if( email.value.trim()==confirm.value.trim()){
		 this.setState({wrongEmail:false});
		 this.setState({[e.target.name]:e.target.value}) 
			 this.props.onChange(e);
		 }
			else this.setState({wrongEmail:true}) 
			
			}

		passwordChange(e)
		{
			this.setState({colorP:"white"});
			const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if(re.test(String(e.target.value))){
			
			this.setState({wrongPassFormat:false})
			let pass=document.getElementById("password").value.trim()
			let confirm=document.getElementById("cpassword").value.trim()
			if(pass!=="" && confirm!=="" && pass==confirm)
			{
				
				this.setState({wrongPass:false}); 
				this.setState({password:true});
				this.props.onChange(e);
				
			}
			else this.setState({wrongPass:true, password:false })
		}
		
		else this.setState({wrongPassFormat:true, password:false});
	
		
		
		}


  

    changeProvince(e, { name, value }) {
        this.setState({ province: value });
        this.props.onSelectChange({ name, value });

    };
    onchangeGrade = (event, data) => {
		

        if (data.value < 12) {


            this.setState({'showParents':true});
        }
        else {

            this.setState({'showParents':false});
        }
		this.props.onSelectChange(data);
    };
    onSelectChange(event,{name,value})
    {
		if(name==="country") this.setState({selectCountry:""})
		this.setState({[name]:value})
		this.props.onSelectChange({name,value});
	}
	onChange(e)
	{
		this.setState({[e.target.name]:e.target.value})
		this.props.onChange(e);
	}
	
	continue(e)
	{
		

		if(!this.state.country) this.setState({selectCountry:"selectCountry"})
		this.setState({colorE:"red",colorP:"red" })
		if(!this.state.password || !this.state.email || !this.state.country || 
		this.state['first_name'] || this.state['last_name']
		 )return false;
		
		
	}
	nextStep()
	{
		this.props.continue();
	}
    render() {
		
        let renderParentInfo;
        const { gender } = this.state;
        
        renderParentInfo = <Grid.Row centered>
                <Grid.Column width={6} textAlign='left' className='form-control'>
                    <input fluid name='parent_email' error label="Parent Email" placeholder='Parent Email' 
                        onChange={this.onChange.bind(this)} />
                </Grid.Column>
                <Grid.Column width={6} textAlign='left'>
                    <input fluid name='parent_phone' placeholder='Parent Name' error label="Parent phone" 
                        onChange={this.onChange.bind(this)} />
                </Grid.Column>
            </Grid.Row>
     
        const parents=<Grid.Row centered id="ParentDetails">
                    <Grid.Column width={5} textAlign='left'>

                        <input label="Parent/Guardian first Name" type="text" id="ParentfName" name='parent_first_name' fluid  placeholder="Parent/Guardian First Name" onChange={this.onChange.bind(this)}/>
                    </Grid.Column>
                    <Grid.Column width={5} textAlign='left'>
                        <input label="Parent/Guardian last Name" type="text" id="ParentlName" name='parent_last_name' fluid placeholder="Parent/Guardian Last Name" onChange={this.onChange.bind(this)}/>
                    </Grid.Column>

                </Grid.Row>
        return (<div>
     <Form name="signup" encType='application/json' onSubmit={this.nextStep.bind(this)}>
            <Grid>
              {/* Header Label */}
                <Grid.Row centered style={{marginTop:"20px"}}>
                    <Grid.Column width={8} textAlign='left'>
                      <h4 class="ui dividing header">Personal Information</h4>
                    </Grid.Column>
                </Grid.Row>
                {/* Full Name Part */}
                <Grid.Row centered textAlign='left'>
                    <Grid.Column width={4}>
                      <span> Name </span>
                      <input type="text" name="first_name" fluid error placeholder='First Name *' required
                          onChange={this.onChange.bind(this)}/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <br/>
                      <input type="text" name="last_name" fluid error placeholder='Second Name *' required
                          onChange={this.onChange.bind(this)}/>
                    </Grid.Column>
                </Grid.Row>
                {/* Grade and Gender */}
                <Grid.Row centered>
                  <Grid.Column width={4} textAlign='left'>
                      <span>State/Province</span>
                      <input type="text" name="state" fluid error placeholder='Add your state/province' 
                          onChange={this.onChange.bind(this)}/>
                      
                  </Grid.Column>
                    <Grid.Column width={4} textAlign='left'>
                        <span> Grade</span>
                        {/* <Form.Select size={'large'} fluid id='grade' name='grade' onChange={this.onchangeGrade} placeholder='Select your grade'
                            options={this.state.gradesList} style={{margin:"0"}}/> */}
                        <Select
                            options={this.state.gradesList} fluid
                            placeholder="Select your grade"
                            id ='grade' selection fluid
                            onChange={this.onchangeGrade} name ='grade'
                        />
                    </Grid.Column>

                </Grid.Row>

                {this.state.showParents && parents}
                {this.state.showParents && renderParentInfo}
                <Grid.Row centered>
                    <Grid.Column width={4} textAlign='left'>
                      <span> Country </span>
                        <Select fluid labeled={true} fluid name='country' required onChange={this.onSelectChange} placeholder='Select your country' options={CountryList} required search />
                        <div style={{color:"red", position:"absolute", left:"41%", bottom:"-20px"}}>{this.state.selectCountry}</div>
                        {/*<Input fluid name='country' type='text' placeholder='Country' required*/}
                        {/*onChange={this.props.onChange}/>*/}
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left'>
                      <span> City </span>
                        <input  type='text' name="city" fluid placeholder='City' error label="City"
                            onChange={this.onChange.bind(this)} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                  <Grid.Column width={4} textAlign='left'>
                    <span> Email</span>
                      <input fluid id='email' name="email" error placeholder='Email *' required type='email'
                        onChange={this.emailChange.bind(this)}
                         
							 />
                      {/* onChange={props.onChange} */}
                      
                      
                      <label id='lblemail'style={{
                          display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                        }}></label>
                  </Grid.Column>
                   <Grid.Column width={4} textAlign='left'>
                     <span>Confirm Email</span>
                      <input fluid name='email' id='cmail' error placeholder='Confirm Email *' 
                      onChange={this.emailChange.bind(this)} onChange={this.emailChange.bind(this)}required type='email' />
                     
                      {/* onChange={props.onChange} */}
                      <label id='lblCemail' style={{
                          display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                        }}></label>
                  </Grid.Column>
                  {this.state.wrongEmail  && <div style={{color:this.state.colorE,position:"absolute", left:"41%", bottom:"-20px"}}> -Emails are not the same </div>}
                  {this.state.wrongFormat && <div style={{color:this.state.colorE,position:"absolute", left:"41%", bottom:"-5px"}}> -Wrong format for email</div>}
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column width={4} textAlign='left'>
                      <span> Password </span>
                        <input id='password' name="password" fluid pattern=".{8,}" error type='password' required title="8 characters minimum"
                            placeholder='Password *' onChange={this.passwordChange.bind(this)}/>
                        <label id='lblpassword' style={{
                            display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                          }}>
                        </label>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='left'>
                        <span> Confirm Password </span>
                        <input fluid name='password' id='cpassword' errortype='password' placeholder='Password Confirmation *'
                            required
                            onChange={this.passwordChange.bind(this)} />
                        <label id='lblCpassword' style={{
                            display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                          }}>
                      </label>
                    </Grid.Column>
                    {this.state.wrongPass && <div style={{color:this.state.colorP,position:"absolute", left:"41%", bottom:"-20px"}}> -Passwords are not the same </div>}
                  {this.state.wrongPassFormat && <div style={{color:this.state.colorP,position:"absolute", left:"41%", bottom:"-5px"}}> -Wrong format for password(at least one number, one lowercase, one uppercase )</div>}
                </Grid.Row>
            </Grid>
             <Grid column={1} centered>
          <Grid.Column width={8} style={{padding:"20px 0"}}>
           <button class="ui olive button"  type='submit' onClick={this.continue.bind(this)}>Continue</button>
            {/* onClick={this.Formvalidation} */}
          </Grid.Column>
        </Grid>
          </Form>
        </div>
        );

    }
}
