import React from 'react';
import { Grid, Select, Form } from 'semantic-ui-react';
import './styles.css';
import { CountryList } from "../../../../helpers/utils";
import $ from 'jquery';
import Phone from 'react-phone-number-input'
import 'react-phone-number-input/rrui.css'
import 'react-phone-number-input/style.css'

export default class AboutSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value:"",
			nextStep:false,
			password_: false,
			email_:false,
			selectCountry:"",
			colorE:"red",
			colorP:"red",
			password:false,
			wrongFormat:false,
			wrongEmail:false,
			country:"",
			
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

		this.changeProvince = this.changeProvince.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
	}

	componentDidMount() {
		window.addEventListener('load', this.handleLoad);
    if(this.props.data.mobile) this.setState({value:this.props.data.mobile})
  }

  emailCheck() {
    let email=document.getElementById("email").value.trim();
    let confirm=document.getElementById("cmail").value.trim();
  
    if(email==confirm) {
      this.setState({wrongEmail:false});
      return true;
    } else {
      this.setState({ wrongEmail:true });
      return false;
    }
  }

  passwordCheck() {
    let pass=document.getElementById("password").value.trim()
    let confirm=document.getElementById("cpassword").value.trim()

    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,]{8,}$/;

    if(re.test(pass)){
      this.setState({wrongPassFormat:false})
      if(pass!=="" && confirm!=="" && pass==confirm) {
        this.setState({wrongPass:false}); 
        return true;
      } else {
        this.setState({ wrongPass:true })
        return false;
      }
    } else {
      this.setState({wrongPassFormat:true});
      return false;
    }
  }

	changeProvince(e, { name, value }) {
		this.setState({ province: value });
		this.props.onSelectChange({ name, value });
  };

	onchangeGrade = (e,{name,value}) => {
		if (value <= 12) {
			this.setState({'showParents':true});
		} else {
			this.setState({'showParents':false});
		}
		this.props.onSelectChange({name,value});
  };

	onSelectChange(event,{name,value}) {
		if(name==="country") this.setState({selectCountry:""})
		this.setState({[name]:value})
		this.props.onSelectChange({name,value});
  }

	onChange(e) {
		this.props.onChange(e);
	}
	
	continue(e) {
		let el;
    if(!this.props.data.grade){
      this.setState({selectGrade:"select your grade"})
			el=document.querySelector("#grade .dropdown.icon");
			$(el).trigger('click');
			window.scrollTo(0,0)
			e.preventDefault();
		} else if(!this.props.data.country) {
      this.setState({selectCountry:"select your country"})
			el=document.querySelector("#country_container input[type='text']");
			$(el).trigger('click');
			e.preventDefault();
		}
		
    this.setState({colorE:"red",colorP:"red" })

		if( !this.emailCheck() || !this.passwordCheck()  || !this.props.data.country || 
		!this.props.data['first_name'] || !this.props.data['last_name'] || !this.props.data.city
		) {
      this.setState({nextStep:false})
    } else this.setState({nextStep:true})
  }

	nextStep(e) {
		if(this.state.nextStep) this.props.continue(e);
		else e.preventDefault();
  }

  setPhone(value) {
    this.setState({value})
    this.props.setPhone(({value}))
  }

	render() {
		const a=<span style={{color:"red"}}>*</span>
	 
		const parents = ( 
      <Grid.Row centered id="ParentDetails">
        <Grid.Column
          width={4}
          textAlign='left'
          name="parent_first_name"
          value={this.state.parent_first_name}
        >
          <input label="Parent/Guardian first Name" required type="text" id="ParentfName" name='parent_first_name' value={this.props.data.parent_first_name} fluid  placeholder="Parent/Guardian First Name" onChange={this.onChange.bind(this)}/>
        </Grid.Column>
        <Grid.Column width={4} textAlign='left'>
          <input label="Parent/Guardian last Name" required type="text" id="ParentlName" name='parent_last_name' value={this.props.data.parent_last_name} fluid placeholder="Parent/Guardian Last Name" onChange={this.onChange.bind(this)}/>
        </Grid.Column>
      </Grid.Row>
    );

		return (
      <div>
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
                <span> First Name</span>{a}
                <input type="text" name="first_name" fluid error placeholder='First Name *' required
                  onChange={this.onChange.bind(this)} value={this.props.data.first_name} />
              </Grid.Column>
              <Grid.Column width={4}>
                <span>Last Name</span>{a}
                <input type="text" name="last_name" fluid error placeholder='Second Name *' required
                  onChange={this.onChange.bind(this)} value={this.props.data.last_name}/>
              </Grid.Column>
            </Grid.Row>
            {/* Grade and Gender */}
            <Grid.Row centered>
              <Grid.Column width={8} textAlign='left'>
                <span> Grade{a}</span>
                <Select
                  name ='grade'
                  options={this.state.gradesList} fluid
                  placeholder="Select your grade"
                  id ='grade' selection fluid
                  value={this.props.data.grade}
                  onChange={this.onchangeGrade} 
                />
              </Grid.Column>
            </Grid.Row>

            {(this.state.showParents || this.props.data.grade<=12) && parents}
            <Grid.Row centered>
              <Grid.Column width={4} textAlign='left'>
                <span> City</span>{a}
                <input  type='text' name="city" value={this.props.data.city} fluid placeholder='City' required error label="City"
                    onChange={this.onChange.bind(this)} />
              </Grid.Column>
              <Grid.Column width={4} textAlign='left'>
                <span>State/Province</span>
                <input type="text" name="state" fluid error placeholder='Add your state/province' 
                  onChange={this.onChange.bind(this)} value={this.props.data.state}/>
              </Grid.Column>
            </Grid.Row>
            
            <Grid.Row centered>
              <Grid.Column width={4} textAlign='left'>
                <span> Country</span>{a}
                <Select fluid labeled={true} fluid name='country' id="country_container" required onChange={this.onSelectChange} placeholder='Select your country' value={this.props.data.country} options={CountryList} required search />
                <div style={{color:"red", position:"absolute", left:"15px", bottom:"-20px"}}>{this.state.selectCountry}</div>
              </Grid.Column>
              <Grid.Column width={4} textAlign='left'>
                <span>Phone</span>
                <Phone
                  placeholder="Enter phone number"
                  autoComplete="off"
                  displayInitialValueAsLocalNumber={true}
                  value={ this.props.data.mobile}
                  required
                  onChange={this.setPhone.bind(this)  }
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column width={4} textAlign='left'>
                <span> Email</span>{a}
                <input fluid id='email' name="email" value={this.props.data.email} error placeholder='Email *' required type='email'
                onChange={this.props.onChange}
                />
                <label id='lblemail'style={{
                  display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                }}></label>
              </Grid.Column>
              <Grid.Column width={4} textAlign='left'>
                <span>Confirm Email</span>{a}
                <input fluid name='email2' id='cmail' value={this.props.data.email2} error placeholder='Confirm Email *' 
                onChange={this.props.onChange}  required type='email' />
                <label id='lblCemail' style={{
                  display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                }}></label>
                {this.state.wrongEmail  && <div style={{color:this.state.colorE,position:"absolute", right:"15px", bottom:"-15px"}}> Email and Confirm Email does not match! </div>}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column width={4} textAlign='left'>
                <span> Password</span>{a}
                <input id='password' name="password" fluid pattern=".{8,}" error type='password' required title="8 characters minimum"
                  placeholder='Password *' onChange={this.props.onChange}/>
                <label id='lblpassword' style={{
                  display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                  }}>
                  {this.state.wrongPassFormat && <span> Wrong format for password(at least one number, one lowercase, one uppercase )</span>}
                </label>
              </Grid.Column>
              <Grid.Column width={4} textAlign='left'>
                <span> Confirm Password</span>{a}
                <input fluid name='confirm_password' id='cpassword' error type='password' placeholder='Password Confirmation *'
                  required
                  onChange={this.props.onChange} />
                <label id='lblCpassword' style={{
                  display: "block", float: "right", color: "red", verticalAlign: "top",paddingTop: "5px"
                  }}>
                  {this.state.wrongPass && <span> Password and Confirm Password does not match! </span>}
                </label>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Grid column={1} centered>
            <Grid.Column width={8} style={{padding:"20px 0"}}>
              <button class="ui olive button"  type='submit' onClick={this.continue.bind(this)}>Continue</button>
            </Grid.Column>
          </Grid>
        </Form>
      </div>
		);
	}
}
