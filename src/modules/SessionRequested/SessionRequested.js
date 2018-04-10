import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Grid, List, Dropdown, Menu, Search,  Form, Icon, Input  } from 'semantic-ui-react';
import {ChatRow} from './chat-strip';

import {ChatActions} from '../../redux/actions';
import {history} from '../../redux/store';

import "./styles.css";

class SessionRequested extends Component {

  state = {chats: [],name: '', submittedName: '' };

  constructor(props) {
    super(props);
   this.state ={
    isEmoji:false,
    emoji:null,
   }
    this.showEmoji = this.showEmoji.bind(this);
    this.createChatsFromResponse = this.createChatsFromResponse.bind(this);
  }

  componentDidMount() {
    const {loadChats} = this.props;
    loadChats();
  }

  componentWillReceiveProps(nextProps) {
    const {chats, error} = nextProps;
    if (error !== undefined && error !== null && error !== this.props.error) {
      //message.error(error);
    }

    this.createChatsFromResponse(chats);
  };

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  createChatsFromResponse = (chats) => {
    let chatRows = chats.map(chat => {
   
      return <ChatRow
        onClick={() => {
          this.onChatSelected(chat)
        }}
        key={chat.key}
        chat={{updatedAt: chat.updatedAt, lastMessage: chat.lastMessage}}
        user={{name: chat.user.lastName+" "+ chat.user.firstName, pictureUrl: chat.user.profilePictureUrl}}/>
    }); 
    this.setState({chats: chatRows});
  };

  onChatSelected = (chat) => {
    const otherUserRole = this.props.currentUser.role === 'student' ? 'tutor' : 'student';
    this.props.showMessages(this.props.currentUser, {...chat.user, role: otherUserRole}, chat.key);
    history.push(`/messages`);
  };
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email } = this.state

    this.setState({ submittedName: name, submittedEmail: email })
  }
  showEmoji(e){
      
      if(this.state.isEmoji === true){
        this.setState({isEmoji: false});
      }else{
        this.setState({isEmoji: true});
      }
     
  }
  setEmoji(emoji) {
    this.setState({emoji: emoji})
  }
  onFilesChange(files){
    console.log(files)
  }
 
  onFilesError(error, file){
    console.log('error code ' + error.code + ': ' + error.message)
  }
  render = () => {
    const {chats, isLoadingChats} = this.state;
    const options = [
      { key: 1, text: 'All Read', value: 'read' },
      { key: 2, text: 'Unread', value:'unread' }
     
    ];
    const { name, submittedName } = this.state
    return (
      <Grid className='session-requested-Container' >
        
        <Grid.Row style={{padding:'0 10px'}}>
      
          <Grid.Column textAlign='left' width={4} className="left-message-tab" >
          
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({auth, chatReducer}) => {
  const {chats, error, isLoadingChats} = chatReducer;
  const {id, role, firstName, lastName} = auth;
  return {currentUser: {id, role, firstName, lastName}, chats, error, isLoadingChats};
};

const mapActionsToProps = () => {
  return {
    loadChats: ChatActions.loadChats,
    showError: ChatActions.showError,
    showMessages: ChatActions.showMessages,
    unsubscribe: ChatActions.unsubscribe
  }
};

export default connect(mapStateToProps, mapActionsToProps())(SessionRequested);
