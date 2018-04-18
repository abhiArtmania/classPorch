import React, {Component} from 'react'
import {history} from '../../../../redux/store';
import {connect} from 'react-redux'
import RequestSession from './RequestSession'
import {  Grid,  Button,  Rating, Image, Label} from 'semantic-ui-react';
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
    const {userId, presentProfileId, profile, fullname, authToken,skills , role,averageRating} = this.props;
   console.log(skills);
   const content = skills.map((post) =>
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
                            <Image src={profileImg} size='medium' circular />
                        </Grid.Column>
                        <Grid.Column width={13} className='userInfo'>
    <h2 className="userName">{this.state.userStatus==="online"&&<Label circular color='green' empty  />}
    {(this.state.userStatus==="offline" &&<Label circular color='red' empty  />)}
    {(this.state.userStatus==="away" && <Label circular color='yellow' empty  />) }
    
     {fullname}{profile['hourly-rate']?<span className="rate">${profile['hourly-rate']}/hr</span>:<span className="rate">N/A</span>}</h2>
                            <h3>Mphil in Philosophy(Masters)-Glasgow University </h3>
                            <div>
                           <div><div className="ui small label"> {this.props.profile.overall_rating?this.props.profile.overall_rating: 0}</div> 
                                <Rating  defaultRating={this.props.profile.overall_rating||0} maxRating={5} disabled/> </div>
                            </div>
                            <div className="ui  labels subjects">
                            {content}
                           
                            </div>
                        
                        </Grid.Column>
                    </Grid.Row>
                    <div className="ui clearing divider"></div> 
                    <Grid.Row>
                    <Grid.Column width={16} >
                    { role ==='tutor'?<Button className="save-profile">Edit Profile</Button>:''}
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

// const mapStateToProps = ({auth,profileState}) => {
//     const role = auth.userObject.user.role

//     return  {role}
// }

export default connect(null, {})(HeaderSection)





                
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