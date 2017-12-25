import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import {history} from '../../../../redux/store';
import './styles.css';

const showSignUp = () => {
  history.push('/sign-up');
};

const Section1 = () => (
    <Grid style={{ backgroundImage: 'url(\'back.jpg\')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'}}>
    <Grid.Row centered className='section-one'>
      <Grid.Column width={12}>
        <p className='home-title'>Student learning. <span className='home-title-bold'>Simplified.</span></p>
        <p className='home-subtitle'>Connecting students with tutors and instructors across the globe.</p>
        <br/>
        <br/>
        <br/>
        <Button circular color='yellow'  size='big' onClick={showSignUp}>SIGN UP</Button>
        <Button circular basic color='yellow' className="find-button" size='big' onClick={showSignUp} style={{marginLeft: 16}}>FIND MORE</Button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Section1;