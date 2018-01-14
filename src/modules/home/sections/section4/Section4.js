import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import {history} from "../../../../redux/store";
import './styles.css';

const showSignUp = () => {
  history.push('/sign-up');
};

const Section4 = () => (
  <Grid id='how-it-works' centered>
    <Grid.Row
      centered
      stretched
      verticalAlign='middle'
      className='section4-background'>
      <Grid.Column width={12} textAlign='center'>
        <div className='how-it-works-section'>
          <p className='section4-header' style={{color: '#fcbd08'}}>
            HOW IT WORKS
          </p>
          <p className='section4-content'>Sign Up: Create your student profile</p>
          <p className='section4-content'>Find tutors using our Search feature</p>
          <p className='section4-content'>Select a time available and book the session</p>
          <p className='section4-content'>Enter the online classroom</p>
          <br/>
          <Button circular size='large' basic color='yellow' className='section4-find-more-button' onClick={showSignUp}>FIND
            MORE</Button>
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Section4;