import React, {Component} from "react";
import {Button, Grid, List} from "semantic-ui-react";
import {history} from '../../../redux/store';
import './_intro.scss';

export default class Intro extends Component {
    goTo(link) {
        history.replace(link);
    }

    render() {
        return (
            <div className='footer-background footer-intro-list' id={'intro'}>
                <Grid padded={'horizontally'}>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <List link size={'big'} className={'intro-items'}>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>HOME</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/about-us')}>ABOUT US</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/contact')}>CONTACT US</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/pricing')}>PRICING</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/faq')}>FAQ (Coming soon)</a></List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List link size={'big'} className={'intro-items'}>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>French Tutors</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>English Tutors</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>Math Tutors,</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>Biology Tutors</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>Physics Tutors</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>Science Tutors</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>Adult Education</a></List.Item>
                                <List.Item><a onClick={this.goTo.bind(this, '/')}>ESL Tutors</a></List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column textAlign={'center'}>
                            <div className='subscribe-label'>
                                INTRODUCING TOP TUTORS
                            </div>
                            <p className='subscribe-subtitle'>
                                At ClassPorch, we have experienced and certified tutors as new tutors are carefully
                                interviewed to
                                ensure they are well qualified before they acquire a tutoring position. With this, we
                                can be sure that
                                our students feel comfortable working with a particular tutor and get the best help
                                possible!
                            </p>
                            <br/>
                            <div>
                                <Button style={{marginLeft: 10, marginRight: 10}} inverted as={'a'} size='large'
                                        circular icon='facebook f'
                                        href={'https://www.facebook.com/ClassPorch-1715528735411313'}/>
                                <Button style={{marginLeft: 10, marginRight: 10}} inverted as={'a'} size='large'
                                        circular icon='twitter' href={'https://twitter.com/classporch'}/>
                                <Button style={{marginLeft: 10, marginRight: 10}} inverted as={'a'} size='large'
                                        circular icon='instagram' href={'https://www.instagram.com/classporch/'}/>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row/>
                </Grid>
            </div>
        )
    }
}