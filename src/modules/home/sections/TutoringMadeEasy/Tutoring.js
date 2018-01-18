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
                            <p className='section-three-feature-details'>Our tutors at ClassPorch are always available
                                24/7 at anytime
                                and any day for the student. This will enable the student ask for help at their own
                                convenience whenever
                                they choose. It is a great thing that with our online tutor, college students can now
                                learn 24/7 with an
                                online instructor making contact through live chat or online email.</p>
                        </Grid.Column>
                        <Grid.Column width={3} style={{paddingLeft: 40}}>
                            <p className='section-three-feature-header'>Affordable</p>
                            <p className='section-three-feature-details'>At ClassPorch, we offer assistance in a large
                                variety of
                                subjects ranging from K-5, Middle School, High School, College and University. Our
                                tutors will help with
                                your school homework or college/university assignments, provide timely test prep tips
                                and offer expert
                                advice with your AP courses. If you happen to need help with college math for example,
                                just search for
                                college math help and you will find our online tutors ready to offer their services.</p>
                        </Grid.Column>
                        <Grid.Column width={3} style={{paddingRight: 40}}>
                            <p className='section-three-feature-header'>Convenience</p>
                            <p className='section-three-feature-details'>Irrespective the problem or question you need
                                help with, our
                                experienced tutors will help you work it out. We do not simply provide our students with
                                ready-to-go
                                answers but make sure they understand the solution and can easily work out similar tasks
                                on their own.
                                Homework help with online tutoring can give a student the needed support to succeed and
                                regain the
                                confidence to become a better learner.</p>
                        </Grid.Column>
                        <Grid.Column width={3} style={{paddingLeft: 40}}>
                            <p className='section-three-feature-header'>Large selection of tutors</p>
                            <p className='section-three-feature-details'>With our interactive technology at ClassPorch,
                                we make
                                learning very effective and fun. Our virtual classroom is equipped with live video,
                                whiteboard, text-
                                and voice-chat, and file sharing tools that allow students to get the most out of every
                                session.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Row>
        </Grid>
    }
}