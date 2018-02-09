import React, {Component} from 'react';
import {Grid, Image} from "semantic-ui-react";

export class Tutoring extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return <Grid className='section-three' id="tutoring">
            <Grid.Row centered>
                <Grid.Column width={8}>
                    <p className='section3-title'>TUTORING <span className='section3-title-semibold'>MADE EASY</span>
                    </p>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
                <div className='section3-seperator'/>
            </Grid.Row>
            <Grid.Row className='section-three-features'>
                <Grid celled='internally'>
                    <Grid.Row centered textAlign='center' columns={4}>
                        <Grid.Column width={3} style={{paddingRight: 40}}>
                            <p className='section-three-feature-header'>Quality tutoring</p>
                            <p className='section-three-feature-details'>At ClassPorch, we provide quality tutoring 
                            services with highly trained and professional tutors.</p>
                        </Grid.Column>
                        <Grid.Column width={3} style={{paddingLeft: 40}}>
                            <p className='section-three-feature-header'>Affordable</p>
                            <p className='section-three-feature-details'>With just $4.99 per hour, you are granted 
                            access to the best online tutors in the world. </p>
                        </Grid.Column>
                        <Grid.Column width={3} style={{paddingRight: 40}}>
                            <p className='section-three-feature-header'>Convenience</p>
                            <p className='section-three-feature-details'>As our tutors are available 24-7, you are
                             allowed to book a session on your own terms.</p>
                        </Grid.Column>
                        <Grid.Column width={3} style={{paddingLeft: 40}}>
                            <p className='section-three-feature-header'>Large selection of tutors</p>
                            <p className='section-three-feature-details'>We have professional tutors available for
                             a wide variety of subjects. </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Row>
        </Grid>
    }
}
