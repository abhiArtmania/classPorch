import React from 'react';
import {history} from '../../redux/store';
import {connect} from 'react-redux';
import {Grid, Form, TextArea, Button, Card, Image, Header, Icon, Modal } from 'semantic-ui-react';
import logoDark from '../../assets/logo_dark.png';
import {setFAQSubject} from '../../redux/actions';
import './index.scss';
class Support extends React.Component {
	
  goFAQ(sub)
  {
	  this.props.setFAQSubject(sub)
	  history.push("/faq")
  }
  close = () => this.setState({ modalVisible: false });
  render() {
    return (
 
    <div>
    <Card.Group style={{margin: "50px 15px"}} itemsPerRow="3" stackable={true}>
    
    <Card className="buttonCard" onClick={this.goFAQ.bind(this,"for Students/Parents")}>
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Card.Header>
          For Students/Parents
        </Card.Header>
        <Card.Meta>
          FAQ
        </Card.Meta>
        <Card.Description>
         _______
        </Card.Description>
      </Card.Content>
     
    </Card>
    <Card className="buttonCard" onClick={this.goFAQ.bind(this,"for Tutors")}>
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Card.Header>
          For Tutors
        </Card.Header>
        <Card.Meta>
          FAQ
        </Card.Meta>
        <Card.Description>
         _______
        </Card.Description>
      </Card.Content>
     
    </Card>
    <Card className="buttonCard" onClick={this.goFAQ.bind(this,"Technical Support")}>
      <Card.Content style={{margin: "auto", padding:"25px",textAlign:"center"}}>
        <Card.Header>
          Technical Support
        </Card.Header>
        <Card.Meta>
          FAQ
        </Card.Meta>
        <Card.Description>
         _______
        </Card.Description>
      </Card.Content>
     
    </Card>

   
    </Card.Group>
 
 
                
                </div>
             
    );
  }
}

const mapStateToProps = ({dashboard}) => {
  const {FAQSubj} = dashboard;
  return {FAQSubj}
};
const mapActionToProps = () => {
  return {setFAQSubject}
};



export default connect(mapStateToProps, mapActionToProps())(Support);
