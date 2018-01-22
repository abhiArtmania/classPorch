import React, {Component} from 'react';
import {Grid, Button} from 'semantic-ui-react';
import MenuChangeStore from '../../menu';
import './styles.css';
import {history} from '../../redux/store';

class SignUpMethods extends Component {

  componentWillMount() {
    this.items = [
      {
        key: 'home',
        name: 'home',
        buttonTitle: 'HOME'
      }, {
        key: 'contact-us',
        name: 'contact-us',
        buttonTitle: 'CONTACT US'
      }
    ];
    MenuChangeStore.changeMenu(this.items);
  }

  openTutorSignUp(e) {
    history.push('/sign-up/tutor');
  }

  openStudentSignUp(e) {
    history.push('/sign-up/student');
  }


  render() {
    return (
      <Grid className='sign-up-methods-body' id={'sign-up'}>
        <Grid.Row centered>
          <p className='sign-up-methods-header'>How would you like to Sign Up?</p>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={4}>
            <Button size='massive' color='orange' circular onClick={this.openTutorSignUp.bind(this)}>Tutor</Button>
          </Grid.Column>
          <Grid.Column width={1}>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button size='massive' color='olive' circular onClick={this.openStudentSignUp.bind(this)}>Student</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SignUpMethods;