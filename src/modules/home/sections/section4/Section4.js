import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import {history} from "../../../../redux/store";
import './styles.css';
import $ from "jquery";

const showSignUp = () => {
    history.push('/sign-up');
    setTimeout(() => {
        $("html, body").animate({scrollTop: $('#sign-up').position().top}, 500);
    })
};

const Section4 = () => (
    <Grid className='how-it-works-section section4-background' id='how-it-works'>
            <Grid.Row centered><p className='section4-header' style={{color: '#fcbd08'}}>
                HOW IT WORKS
            </p>
            </Grid.Row>
            <Grid.Row centered>
                <Grid>
                    <Grid.Row centered columns={4}>
                        <Grid.Column width={3}>
                            <p className='section4-content'>Sign Up: Create your student profile</p><i className="fa fa-long-arrow-right icon-arrow" aria-hidden="true"/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <p className='section4-content'>Find tutors using our Search feature</p><i className="fa fa-long-arrow-right icon-arrow" aria-hidden="true"/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <p className='section4-content'>Select a time available and book the session</p><i className="fa fa-long-arrow-right icon-arrow icon-arrow-last" aria-hidden="true"/>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <p className='section4-content'>Enter the online classroom</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Row>
            <Grid.Row centered>
                <Button circular size='large' basic color='yellow' className='section4-find-more-button'
                        onClick={showSignUp}>FIND
                    MORE</Button>
            </Grid.Row>
    </Grid>

);

export default Section4;

