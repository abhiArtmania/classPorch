import React, {Component} from 'react'
import {history} from '../../../../redux/store';
import {connect} from 'react-redux'
import RequestSession from './RequestSession'
import SkillSegment from './SkillSegment'

import {  Grid,  Button,  Rating, Image, Label, Input, Icon, Form} from 'semantic-ui-react';
import './styles.css';
import profileImg  from '../../../../assets/profile/profile.jpg';
import {apiEndpoints} from '../../../../ApiEndpoints';
import axios from 'axios';
let status;
class HeaderSection extends Component {
  constructor(props) {
    super(props);
    this.state = { userStatus: this.props.profile.online_status};
  }
  
  state = {}
  startUploading = (event) => {
    // this.setState({isUploadingFile: true});
    // this.props.uploadFile(event.target.files[0], {contentType: 'image/jpeg'});
    // event.target.value = null;
    console.log('Selected file:', event.target.files[0]);
    this.props.updateProfilePicture()
  };
  onChangeRate = (e,{value}) => {
    this.props.onChangeUserInfo('hourly_rate',value );
    

};
onChangeFullName = (e,{value}) => {
  this.props.onChangeUserInfo('fullname',value );
  

};

onClickEdit = () => {
    console.log('test');
  this.props.toggleProfileMode('edit')

};
  onFocusChange = (e) => {
    if(e.type==='focus'){
      e.target.type = 'file';
      e.target.click()
    }
  };

  redirectToChats = () => {
    const currentUser = {
      name: this.props.firstName + " " + this.props.lastName,
      role: this.props.role,
      id: this.props.userId
    };
    const otherUser = {
      name: this.props.profile["full-name"],
      role: 'tutor',
      id: this.props.presentProfileId
    };
    this.props.showMessages(currentUser, otherUser, null);
    history.push('/messages');
  };
  setStateAsync(state) {

    return new Promise((resolve) => {
      status=resolve;
      this.setState(state, resolve);
      this.setState(state, resolve)
    });
  }
  /*async componentDidMount() {
    console.log(`${apiEndpoints.base}/user/online_status`);
    const res = await fetch(`${apiEndpoints.base}/user/online_status`,
      {
        headers: {
          'auth-token': this.props.authToken
        }
      }
    )
    const rult  = await res.json();
    console.log(rult.response.online_status);
    this.setState({status: rult.response.online_status });
    await this.setStateAsync({status: rult.response.online_status})
    
  }*/
  render() {
    const {userId, presentProfileId, profile, fullname, authToken,onChangeSkill, role,averageRating, toggleProfileMode,mode, onChangeUserInfo} = this.props;
   console.log("props",this.props);
   const content = profile.skills.map((post) =>
   <div className="ui label" key={post.id}>{post.name} </div>
 );
    const searchRequested = ( authToken) => {
      return async () => {
          try {
             
              let rawRes = await fetch(`https://classporch-staging-backend.herokuapp.com/api/v1/user/online/online_status` , {
                  headers: {
                      'auth-token': authToken
                  }
              });
              let res = await rawRes.json();
  
              return res.results;
          } catch (e) {
              return e;
          }
      }
  };
console.log(this.state.userStatus);
    return (
      <Grid className={'profile-section'}>
                    <Grid.Row width={16} className=''>
                        <Grid.Column width={3} className='profileImage'>
                        <Form className='profile-picture-form'> 
                        <Input name="myImage" type="file"
                             accept=".png,.gif"
                              placeholder="Change Profile Picture"
                              className='image-input'
                              onChange={this.handleChange}/>
</Form> 
                            <Image src={profileImg} size='medium' circular />
                        </Grid.Column>
                        <Grid.Column width={13} className='userInfo'>
    <h2 className="userName">{this.state.userStatus==="online"&&<Label circular color='green' empty  />}
    {(this.state.userStatus==="offline" &&<Label circular color='red' empty  />)}
    {(this.state.userStatus==="away" && <Label circular color='yellow' empty  />) }
    
     {profile["fullname"]}
     { mode === 'edit' ? 
        <Input className='profile-rate' value={profile["fullname"]} onChange={this.onChangeFullName.bind(this)} type='text' /> : ''
      }
     <span className="rate">
    {(profile.hourly_rate) ? '$'+profile.hourly_rate+'/hr':'N/A' }
     { mode === 'edit' ? 
        <Input className='profile-rate' value={profile['hourly-rate']} onChange={this.onChangeRate.bind(this)} type='number' /> : ''
      }
     
     </span>
     
     
      
            
     
     
     </h2>
                            <h3>Mphil in Philosophy(Masters)-Glasgow University </h3>
                            <div>
                           <div><div className="ui small label"> {this.props.profile.overall_rating?this.props.profile.overall_rating: 0}</div> 
                                <Rating  defaultRating={this.props.profile.overall_rating||0} maxRating={5} disabled/> </div>
                            </div>
                            <div className="ui  labels subjects">
                            {content}
                            { mode === 'edit' ?
                            <SkillSegment profile={profile} userId={userId} authToken={authToken}  role={role}
                                presentProfileId = {presentProfileId} onChangeSkill={onChangeSkill} mode={mode}
                                toggleProfileMode={this.props.toggleProfileMode}  />: ''}
                            </div>
                        
                        </Grid.Column>
                    </Grid.Row>
                    <div className="ui clearing divider"></div> 
                    <Grid.Row>
                    <Grid.Column width={16} >
                    { role ==='tutor'?<Button className="save-profile" onClick={this.onClickEdit}>Edit Profile</Button>:''}
                    <Button  className="session-booking-btn">Message Tutor</Button>
                    </Grid.Column >
                    </Grid.Row>
      </Grid>
    )
  }
}

const styles = {
  text: {
    fontSize: '1.2em'
  },
  roleText: {
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  heading: {
    fontSize: '40px',
    fontWeight: '300'
  }
};

const mapStateToProps = ({auth,profileState}) => {
    // const role = auth.userObject.user.role
    // const {profile} = profileState
    console.log("mapStateToProps",profileState,auth)

    return  {}
}

export default connect(null, mapStateToProps)(HeaderSection)





                
{/* <form className='profile-picture-form'> 
<Form.Field name="myImage"
            type='text'
            onFocus={this.onFocusChange}
            onBlur={this.onFocusChange}
            control={'input'}
           accept={'.jpg, .jpeg'} 
           placeholder="Change Profile Picture"
           className='image-input'
           onChange={this.handleChange}/>
</form>  */}





//  <form className='profile-picture-form'> 
//                   <FileInput name="myImage"
//                              accept=".png,.gif"
//                              placeholder="Change Profile Picture"
//                              className='image-input'
//                              onChange={this.handleChange}/>
//                  </form> 