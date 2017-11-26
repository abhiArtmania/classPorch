import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
import './styles.css'

const Section6 = () => (
    <Grid className='section-six'>
        <Grid.Row centered>
            <Grid.Column width={8}>
                <p className='section6-title'>WE WOULD LOVE TO HEAR FROM <span className='section6-title-semibold'>YOU</span>
                </p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <div className='section6-seperator'></div>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={10}>
                <p className='section6-content'>
                    Our online teachers hold a wealth of knowledge, academic degrees and experience. Students will find homework tutors, college-readiness tutors, academic tutors and career tutors. Hiring a tutor who is actually specialist about what they are teaching will assist you become passionate and enthusiastic about learning.
                </p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={8}>
                <br/>
                <br/>
                <Button circular basic color='yellow' size='large'>WRITE TO US</Button>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default Section6;