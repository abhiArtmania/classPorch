import React from 'react';
import {history} from '../../redux/store';
import {Grid, Form, TextArea, Button, Card, Image, Header, Icon, Modal } from 'semantic-ui-react';
import logoDark from '../../assets/logo_dark.png';
import telephone from '../../assets/contact/oldtelephone.png';
import envelope from '../../assets/contact/envelope.png';
import book from '../../assets/contact/book.png';
import './index.scss';



export default class ContactUs2 extends React.Component {
	state = {
    modalVisible: false
}
  showModal = () => this.setState({ modalVisible: true });
  goFAQ()
  {
	  history.push("/faq")
  }
  close = () => this.setState({ modalVisible: false });
  render() {
    return (
    
    <div>
    <Card.Group style={{margin: "50px 15px"}} itemsPerRow="3" stackable={true}>
    <Card className="buttonCard" onClick={this.goFAQ.bind(this)}>
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Image floated='center' size='medium' src={book} />
        <Card.Header>
          FAQ
        </Card.Header>
        <Card.Meta>
          FAQ
        </Card.Meta>
        <Card.Description>
         FAQ
        </Card.Description>
      </Card.Content>
     
    </Card>
    <Card className="buttonCard">
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Image floated='center' size='medium' src={telephone} />
        <Card.Header>
          Call us
        </Card.Header>
        <Card.Meta>
          Call us
        </Card.Meta>
        <Card.Description>
         Click to get our number
        </Card.Description>
      </Card.Content>
     
    </Card>
     <Card className="buttonCard" onClick={this.showModal.bind(this)}>
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Image floated='center' size='small' src={envelope} style={{margin:"25px 0 50px  0"}}/>
        <Card.Header style={{marginTop:"25px"}} >
          Write us
        </Card.Header>
        <Card.Meta>
          Write us
        </Card.Meta>
        <Card.Description>
          Click to write us
        </Card.Description>
      </Card.Content>
     
    </Card>
  
    </Card.Group>
     <Modal dimmer='blurring' open={this.state.modalVisible} closeOnDimmerClick={true} closeIcon={true} onClose={this.close.bind(this)}>
    <Header icon={logoDark} content='Contact Us' />
    <Modal.Content>
      <Form style={{width: '100%'}}>
                  <Form.Input name={'name'} label='Your name' placeholder='John Doe'/>
                  <Form.Input name={'email'} label='Email' placeholder='johndoe@classporch.com'/>
                  <Form.Input name={'mobile'} label='Mobile Number' placeholder='Please enter with your country code'/>
                  <Form.Field name={'message'} label='Your message' control={TextArea} rows='6'/>
                  <Button type='submit' style={{float: 'right', marginRight: '20px'}}>Submit</Button>
                </Form>
    </Modal.Content>
 
  </Modal>
                
                </div>
             
    );
  }
}
