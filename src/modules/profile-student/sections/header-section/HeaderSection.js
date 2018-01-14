import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import {connect} from 'react-redux';

import './styles.css'

// import RequestSession from './RequestSession'

class HeaderSection extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      changeProfilePicturePlaceholder: 'Change Profile Picture'
    }
  }

  handleChange = (event) => {
    console.log('Selected file:', event.target.files[0]);
    this.setState({changeProfilePicturePlaceholder: 'Uploading 0%'});
  };

  render() {
    const {userId, presentProfileId, role} = this.props;
    const {changeProfilePicturePlaceholder} = this.state;
    return (
      <Grid padded relaxed style={{width: '100%'}}>
        <Grid.Row stretched columns={1} centered>
          <Grid.Column width={6} textAlign='left'>
            <div style={styles.heading}>
              {userId === presentProfileId ?
                'Your Profile' : this.props.profile['full-name']}
            </div>
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <form className='profile-picture-form'>
              {/*<FileInput name="myImage"*/}
                         {/*accept=".jpg, .jpeg"*/}
                         {/*placeholder={changeProfilePicturePlaceholder}*/}
                         {/*className='image-input'*/}
                         {/*onChange={this.handleChange}/>*/}
            </form>
          </Grid.Column>

        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={12} textAlign='left'>

            {userId === presentProfileId ?
              <div style={styles.text}>
                You have registered as a
                <span style={styles.roleText}> {role} </span>
              </div> : null
            }
          </Grid.Column>
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

