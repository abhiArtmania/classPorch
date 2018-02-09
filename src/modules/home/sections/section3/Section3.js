import React from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import './styles.css';
import imageOne from '../../../../assets/section3/section3_1.png';
import imageTwo from '../../../../assets/section3/section3_2.png';
import imageThree from '../../../../assets/section3/section3_3.png';
import imageFour from '../../../../assets/section3/section3_4.png';

const scrollTo = () => {
    document.getElementById('pricing').scrollIntoView({block: 'start', behavior: 'smooth'});
};

const Section3 = () => (
    <Grid className='section-three' id="introduction">
        <Grid.Row centered>
            <Grid.Column width={8}>
                <p className='section3-title'>INTRODUCING <span className='section3-title-semibold'>TOP TUTORS</span>
                </p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
            <div className='section3-seperator'/>
        </Grid.Row>
        <Grid.Row centered>
            <Grid.Column width={10}>
                <p className='section3-subtitle'>At ClassPorch, we take ample time to interview all our tutors to ensure they
                 are well qualified before they are granted a tutoring position. <br />
<b>24-7 Availability</b>
<br />
Our tutors are available 24-7 enabling students to reach out for help at their convenience.
<br />
<b>Variety of Subjects</b>
<br />
We offer tutoring services for a wide variety of subjects ranging from K-5, middle & high school and college subjects. 
<br />
<b>Homework made Easy</b>
<br />
Our tutors are qualified and readily available to help you with homework and assignments.
<br />
<b>Whiteboard + Audio/Video Compatibility</b>
<br />
Our highly interactive technology makes the learning process more effective and fun for both tutors and students.</p>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row className='section-three-features'>
            <Grid celled='internally' style={{marginLeft: 80, marginRight: 80}}>
                <Grid.Row centered textAlign='left'>
                    <Grid.Column width={6} style={{paddingRight: 40, paddingBottom: 40}}>
                        <Grid>
                            <Grid.Row textAlign='right'>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'>24-7 Availability</p>
                                    <p className='section-three-feature-details'>Our tutors at ClassPorch are always
                                        available 24/7 at anytime
                                        and any day for the student. This will enable the student ask for help at their
                                        own convenience whenever
                                        they choose. It is a great thing that with our online tutor, college students
                                        can now learn 24/7 with an
                                        online instructor making contact through live chat or online email.</p>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageOne}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6} style={{paddingLeft: 40, paddingBottom: 40}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageTwo}/>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'>Variety of Subjects</p>
                                    <p className='section-three-feature-details'>At ClassPorch, we offer assistance in a
                                        large variety of
                                        subjects ranging from K-5, Middle School, High School, College and University.
                                        Our tutors will help with
                                        your school homework or college/university assignments, provide timely test prep
                                        tips and offer expert
                                        advice with your AP courses. If you happen to need help with college math for
                                        example, just search for
                                        college math help and you will find our online tutors ready to offer their
                                        services.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered textAlign='left'>
                    <Grid.Column width={6} style={{paddingRight: 40, paddingTop: 40}}>
                        <Grid>
                            <Grid.Row textAlign='right'>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'>Homeworks made easy</p>
                                    <p className='section-three-feature-details'>Irrespective the problem or question
                                        you need help with, our
                                        experienced tutors will help you work it out. We do not simply provide our
                                        students with ready-to-go
                                        answers but make sure they understand the solution and can easily work out
                                        similar tasks on their own.
                                        Homework help with online tutoring can give a student the needed support to
                                        succeed and regain the
                                        confidence to become a better learner.</p>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageThree}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6} style={{paddingLeft: 40, paddingTop: 40}}>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Image style={{paddingTop: 20}} src={imageFour}/>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <p className='section-three-feature-header'> Whiteboard + Audio/Video
                                        Compatability</p>
                                    <p className='section-three-feature-details'>With our interactive technology at
                                        ClassPorch, we make
                                        learning very effective and fun. Our virtual classroom is equipped with live
                                        video, whiteboard, text-
                                        and voice-chat, and file sharing tools that allow students to get the most out
                                        of every session.</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Grid.Row>
        <Grid.Row centered>
            <Button style={{marginTop: 30}} onClick={scrollTo} circular color='yellow' size='large'
                    className='pricing-plans-button'>VIEW OUR PRICING PLANS</Button>
        </Grid.Row>
    </Grid>
);

export default Section3;
