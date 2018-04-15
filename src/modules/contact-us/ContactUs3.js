import React, { Component } from 'react';
import {history} from '../../redux/store';
import Faq from '../../assets/contact/faq2.jpg';
import Msg from '../../assets/contact/envelope4.jpg'
import Msg2 from '../../assets/contact/envelope3.png'
import Telephone from '../../assets/contact/telephone8.jpg'
import { Card, Icon, Image } from 'semantic-ui-react'
import { Popup, Button, Header, Modal, Form, Input, TextArea } from 'semantic-ui-react'
import './style.css'


var styles = {
    col: {
        // height: '200px',
        backgroundColor: '#F5A623'
    },
    icons: {
        width: '30%',
        height: '30%',
        margin: '0 auto',
        display: 'block',
    },
    modalImage: {
        width: '200px',
        height: '200px',
        display: 'block',
        marginTop: '60px'
    },
    cardGroup: {
        margin: '10px 5px',
        marginBottom: '50px'
    },
    card: {
        height: '40%',
        boxShadow: 'none'
        // boxShadow: '1px 10px 14px -6px rgba(0,0,0,0.75)',
    },
    cardFooter: {
        backgroundColor: '#F5A623',
        color: 'white'
    },
    footerContent: {
        color: 'white'
    },
    modal: {
        width: '60%',
        height: '72%',
    },
    modalForm: {
        width: '700px',
        height: '700px'
    },
    inputPhone: {
        width: '480px'
    },
    btnSubmit: {
        float: 'right',
        backgroundColor: '#F5A623',
        color: 'white',
        marginRight: '20px'
    },
    header: {
        margin: '15px',
        textAlign: 'center',
        fontSize: '50px'
    },
    headerHelp: {
        color: '#F5A623'
    }
}


class ContactUs3 extends Component {
    state = {
        modalVisible: false
    }
      showModal = () => this.setState({ modalVisible: true });
    goFAQ()
  {
	  history.push("/support")
  }
  close = () => this.setState({ modalVisible: false });
    render() {
        return (
            <div>
                <h1 className="ui header" style={styles.header} >Want any <span style={styles.headerHelp}>help?</span></h1>
                <Card.Group style={styles.cardGroup} itemsPerRow="3" stackable={true}>
                <Card style={styles.card} onClick={this.goFAQ.bind(this)}>
                <Image src={Faq} style={styles.icons} />
                <Card.Content>
                <Card.Header>
                    Frequently Asked Questions
                </Card.Header>
                {/* <Card.Meta>
                    <span className='date'>
                    Joined in 2015
                    </span>
                </Card.Meta> */}
                <Card.Description>
                    Ask your queries!
                </Card.Description>
                </Card.Content>
                <Card.Content extra style={styles.cardFooter}>
                <a>
                    <Icon name='question' style={styles.footerContent} />
                    <span style={styles.footerContent}>22 Questions Posted</span>
                </a>
                </Card.Content>
                </Card>





                <Card style={styles.card}>
                <Image src={Telephone} style={styles.icons} />
                <Card.Content>
                <Card.Header>
                    Call Us
                </Card.Header>
                {/* <Card.Meta>
                    <span className='date'>
                    Joined in 2015
                    </span>
                </Card.Meta> */}
                <Card.Description>
                    Click to get our number!
                </Card.Description>
                </Card.Content>
                <Card.Content extra style={styles.cardFooter}>
                <a>
                    <Icon name='call' style={styles.footerContent}/>
                    <span style={styles.footerContent}>17 People Called Us!</span>
                </a>
                </Card.Content>
                </Card>





                <Card style={styles.card} onClick={this.showModal.bind(this)}>
                <Image src={Msg} style={styles.icons} />
                <Card.Content>
                <Card.Header>
                    Write Us
                </Card.Header>
                {/* <Card.Meta>
                    <span className='date'>
                    Joined in 2015
                    </span>
                </Card.Meta> */}
                <Card.Description>
                    Click to write us!
                </Card.Description>
                </Card.Content>
                <Card.Content extra style={styles.cardFooter}>
                <a>
                    <Icon name='mail' style={styles.footerContent} />
                    <span style={styles.footerContent}>17 People Wrote Us!</span>
                </a>
                </Card.Content>
                </Card>

                </Card.Group>

                {/* <Modal dimmer='blurring' open={this.state.modalVisible} closeOnDimmerClick={true} closeIcon={true} onClose={this.close.bind(this)}>
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={Msg} />
                    <Modal.Description>
                    <Header>Default Profile Image</Header>
                    <p>We've found the following gravatar image associated with your e-mail address.</p>
                    <p>Is it okay to use this photo?</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={this.close}>
                    Nope
                    </Button>
                    <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.close} />
                </Modal.Actions>
                </Modal> */}

                <Modal dimmer='blurring' open={this.state.modalVisible} closeOnDimmerClick={true} closeIcon={true} onClose={this.close.bind(this)} style={styles.modal}>
                <Modal.Header style={styles.cardFooter}>Stay In Touch!</Modal.Header>
                <Modal.Content image>
                <Image wrapped size='large' src={Msg2} style={styles.modalImage}/>
                <Modal.Description>
                    <Header>Leave Us A Message</Header>

                    <Form style={styles.modalForm} >

                    <Form.Group>
                    <Form.Input fluid label='First name' placeholder='First name' />
                    <Form.Input fluid label='Last name' placeholder='Last name' />
                    </Form.Group>

                    <Form.Group inline>
                    <Form.Field>
                        <label>Phone Number</label>
                        <Input placeholder='xxx' style={styles.inputPhone} />
                    </Form.Field>
                    </Form.Group>
                    <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Message' placeholder='Message' />
                    <Button style={styles.btnSubmit}>Submit</Button>
                    </Form>

                </Modal.Description>
                </Modal.Content>
                </Modal>

            </div>
        );
    }
}

export default ContactUs3;