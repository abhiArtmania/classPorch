import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Grid,
  List,
  Input,
  Form,
  Image
} from 'semantic-ui-react';
import { OtherMessage, OwnMessage } from './messageRows';
import { MessageActions } from '../../redux/actions';
import './styles.css';

class Messaging extends Component {

  state = { messages: [] };

  constructor(props) {
    super(props);
    this.createMessageRows = this.createMessageRows.bind(this);
    this.startUploading = this.startUploading.bind(this);
    this.state = {
      isUploadingFile: false
    }
  }

  componentDidMount() {
    this.props.loadMessages();
  }

  componentWillReceiveProps(nextProps) {
	  
    const { messages, error } = nextProps;
    if (error !== undefined && error !== null && error !== this.props.error) {
      //message.error(error);
    }
    this.setState({ isUploadingFile: nextProps.isUploadingFile, uploadProgress: nextProps.uploadProgress });
    this.createMessageRows(messages);
  }
componentDidUpdate()
{
	
	let container=document.getElementById("messaging_scroll");
	let lastMsg=document.querySelector("#messaging_scroll .item:last-child")
	
	//lastMsg.scrollIntoView(false)
}
  componentWillUnmount() {
    this.props.unsubscribe();
  }

  createMessageRows = (messages) => {
    console.log("Ye msgs",messages);
    if(messages){
    let messageRows = messages.map(message => {
      if (this.props.currentUser.role === message.sentBy) {
        return <OwnMessage key={message.key} message={message} />;
      } else {
        return <OtherMessage key={message.key} message={message} />;
      }
    });
    this.setState({ messages: messageRows });
  }
  };
onKeyPress(e){
	if(e.key=="Enter"){
	 const newMessage = e.target.value;
    if (!newMessage.trim()) { return }
    this.props.sendMessage(newMessage);
    e.target.value = '';
}
	
	}
  sendNewMessage = (event) => {
    const newMessage = event.target.parentElement.firstElementChild.value;
    if (!newMessage.trim()) { return }
    this.props.sendMessage(newMessage);
    event.target.parentElement.firstElementChild.value = '';
  };

  startUploading = (event) => {
    this.setState({ isUploadingFile: true });
    this.props.uploadFile(event.target.files[0], { contentType: 'image/jpeg' });
    event.target.value = null;
  };

  render() {
    const { messages, isUploadingFile } = this.state;
    console.log("Ye msgs prop",this.props.messages)
    const profilePicture =  this.props.otherUser ? this.props.otherUser.pictureUrl : `http://via.placeholder.com/300?text=r`;
    return (
      <div>
        <Grid verticalAlign={'middle'} style={{ marginTop: 16, marginBottom: 16 }}>
          <Grid.Row centered>
            <Grid.Column width={2} style={{ fontSize: 24, fontWeight: 500, color: '#BBB' }}>
              <Link to={'/chats'}>
                {'< Chats'}
              </Link>
            </Grid.Column>
            <Grid.Column width={1} style={{ cursor: 'pointer' }}>
              <Image size={'tiny'} avatar bordered src={profilePicture} />
            </Grid.Column>
            <Grid.Column textAlign='left' width={11} style={{ cursor: 'pointer' }}>
              <span style={{ fontSize: 32, fontWeight: 300 }}>
                {'xyz' +" "+ 'abc'}
              </span>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign={'left'} width={12} id={"messaging_scroll"} style={{ height: '53vh', overflow: 'scroll' }}>
              <List relaxed>{messages}</List>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={2}>
              <Form loading={isUploadingFile}>
                <Form.Field name={'selectedFile'} control={'input'} type='file' accept={'.jpg, .jpeg'} onChange={this.startUploading} />
              </Form>
            </Grid.Column>
            <Grid.Column width={10}>
              <Input fluid action={{ content: 'Send Message', type: 'submit', onClick: (event) => { this.sendNewMessage(event) } }} placeholder={'Write a message...'} onKeyPress= {this.onKeyPress.bind(this)} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ messageReducer }) => {
  return {
    messages: messageReducer.messages,
    error: messageReducer.error,
    isLoadingMessages: messageReducer.isLoadingMessages,
    chatId: messageReducer.chatId,
    currentUser: messageReducer.currentUser,
    otherUser: messageReducer.otherUser,
    isUploadingFile: messageReducer.isUploadingFile,
    uploadProgress: messageReducer.uploadProgress
  };
};

const mapActionsToProps = () => {
  return {
    loadMessages: MessageActions.loadMessages,
    sendMessage: MessageActions.sendMessage,
    uploadFile: MessageActions.uploadFile,
    showError: MessageActions.showError,
    unsubscribe: MessageActions.unsubscribe
  }
};

export default connect(mapStateToProps, mapActionsToProps())(Messaging);
