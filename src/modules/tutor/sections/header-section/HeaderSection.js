import React from 'react';
import {history} from '../../../../redux/store';
import {connect} from 'react-redux';
import { object } from 'prop-types';
import {bookedTutor,MessageActions} from '../../../../redux/actions';
// import {sendMessage} from '../../../../redux/actions/MyMessageActions';
// import {} from '../../../../redux/actions/MessageActions';
import {
  Grid,
  Button, Modal, Image, Header, Form, Input, TextArea, Dropdown
} from 'semantic-ui-react';
import './styles.css';
import Msg2 from '../../../../assets/contact/envelope3.png'

// import defaultAvatar  from '../../../assets/avatar/default.png';
import defaultAvatar from '../../../../assets/avatar/default.png'


import { Rating } from '../../../../components/common';

// const HeaderSection = props => {
//   const { tutorInfo, tutorId } = props;


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
      height: '85%',
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
      // marginRight: '-20px'
  },
  btnCancel: {
    float: 'right',
    backgroundColor: '#F5A623',
    color: 'white',
    marginRight: '-80px'
},
  header: {
      margin: '15px',
      textAlign: 'center',
      fontSize: '50px'
  },
  headerHelp: {
      color: '#F5A623'
  },
  dropdown: {
    width: '111%',
    margin: '0 auto',
  }
}


class HeaderSection extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      message: '',
      stateOptions: [ { key: 'AL', value: 'AL', text: 'Alabama' } ],
      skills: [],
      selected_skill_name: '',
    }

  }
  showModal = () => this.setState({ modalVisible: true });
  close = () => this.setState({ modalVisible: false });
  handleChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
  })
  }
  sendMessage = () => {
    var msgObj = {
      message: this.state.message,
      subject: this.state.selected_skill_name,
    }
    console.log("Sending Message . . .",msgObj);
    this.props.sendMessage(msgObj.message);
    this.props.findChat();
    this.setState({modalVisible: false, message: '', selected_skill_name: ''})
  }

  componentWillReceiveProps(nextProps) {
    console.log("ye skills hain abi willrecieveprops may",nextProps.tutorInfo.skills);
    this.setState({ 
      skills: nextProps.tutorInfo.skills.map(x => {
          return { key:x.id, text:x.name, value:x.name }
      })   
  })
  }
  



  setValue(e, data) {
    this.setState({ selected_skill_name: data.value },()=>{
      console.log("SKILL Name: "+this.state.selected_skill_name)
      // localStorage.setItem("skill_id",JSON.stringify(this.state.selected_skill_id))
    })
  }
  
render(){
  const { tutorInfo, tutorId } = this.props;

  console.log("ye skills hain abi render may",tutorInfo.skills)
  return (
    <div>
    <Grid className='profile-section' >
      <Grid.Row width={16}>
        <Grid.Column width={3} className='profileImage'>
          <img
            src={tutorInfo.image ? tutorInfo.image : defaultAvatar}
            alt="Tutor Avatar"
          />
        </Grid.Column>
        <Grid.Column width={13} className='userInfo'>
          <h2 className="userName">
            <div class={`userName__status ${tutorInfo.online_status}`}></div>
            <span>{tutorInfo.fullname}</span>
            <span className="pull-right">
              {tutorInfo.hourly_rate ? `$${tutorInfo.hourly_rate}/hr` : "N/A"}
            </span>
          </h2>
          {tutorInfo.educations && tutorInfo.educations.map(item => {
            return (
              <h3 className="university__text">{item.university_name}</h3>
            )
          })}

          <div>
            <div className="ui small label">
              {tutorInfo.overall_rating ? tutorInfo.overall_rating : 0}
            </div> 
            <Rating rate={tutorInfo.overall_rating} name={tutorInfo.id} />
          </div>

          <div className="ui labels subjects">
            {tutorInfo.skills && tutorInfo.skills.map(skill => {
              return (
                <span
                  key={`skill_${skill.id}`}
                  className="ui label"
                >
                  {skill.name}
                </span>
              )
            })}
          </div>

          <Button  className="session-booking-btn" onClick={this.showModal.bind(this)}>Message Tutor</Button> &nbsp;
          <Button onClick={()=>{
            this.props.bookedTutor(tutorInfo);
            history.push('/session-booking/'+tutorId);
          }} className="session-booking-btn">Book a Session</Button>
       
        </Grid.Column>
      </Grid.Row>
      <div className="ui clearing divider"></div>
    </Grid>



<Modal open={this.state.modalVisible} closeOnDimmerClick={true} closeIcon={true} onClose={this.close.bind(this)} style={styles.modal}>
                              
               
                <Modal.Header style={styles.cardFooter}>Message To Tutor</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <Header>Select Subject</Header>

                    <Form style={styles.modalForm} >

                    <Dropdown placeholder='Subject' style={styles.dropdown} onChange={this.setValue.bind(this)} value={this.state.selected_skill_name} search selection options={this.state.skills} />
                    
                    <Header>Write Your Message</Header>
                    
                    <Form.Field name="message" id='form-textarea-control-opinion' value={this.state.message} onChange={this.handleChange} style={{height: '230px',width: '114%'}} control={TextArea} label='Message' placeholder='Message' />
                    <Button style={styles.btnCancel} onClick={this.sendMessage} >Send</Button>
                    <Button style={styles.btnSubmit} onClick={this.close}>Cancel</Button>
                    </Form>

                </Modal.Description>
                </Modal.Content>
                </Modal>


    </div>
  )
}
}

HeaderSection.propTypes = {
  tutorInfo: object.isRequired,
}

HeaderSection.defaultProps = {
  tutorInfo: {},
}

const mapActionToProps = () => {
  return {
    bookedTutor,
    sendMessage: MessageActions.sendMessage,
    findChat: MessageActions.findChat,
  }
};
const mapStateToProps = ({ messageReducer }) => {
  console.log("Message Reducer",messageReducer)
  return {

  }
}



export default connect(null, mapActionToProps())(HeaderSection)

// export default HeaderSection
