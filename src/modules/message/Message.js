import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Grid, List, Dropdown, Menu, Search,  Form, Icon, Input  } from 'semantic-ui-react';
import {ChatRow} from './chat-strip';
import { OtherMessage, OwnMessage } from '../messaging/messageRows';
import EmojiPicker from 'emoji-picker-react';
import {ChatActions} from '../../redux/actions';
import { MessageActions } from '../../redux/actions';
import {history} from '../../redux/store';
import Files from 'react-files'
import "./styles.css";
import JSEMOJI from 'emoji-js';
import $ from 'jquery'

const styles = {
  emoji: {
    marginBottom: '200%'
  }
}

class Message extends Component {

  // state = {chats: [],name: '', submittedName: '' };

  constructor(props) {
    super(props);
   this.state ={
    isEmoji:false,
    emoji:null,
    loadMessageState: false,
    message: '',
    isUploadingFile: false
   }

   

    this.showEmoji = this.showEmoji.bind(this);
    this.createChatsFromResponse = this.createChatsFromResponse.bind(this);
    this.createMessageRows = this.createMessageRows.bind(this);
    // this.startUploading = this.startUploading.bind(this);
  }

  componentDidMount() {
    const {loadChats} = this.props;
    loadChats();

    console.log("ye chats",loadChats);


      // this.props.loadMessages();
  }

  componentWillReceiveProps(nextProps) {
    const {chats, error, messages} = nextProps;
    if (error !== undefined && error !== null && error !== this.props.error) {
      //message.error(error);
    }
    // if(messages !== undefined && messages !== null){
      // console.log("createMessageRows function called")
      this.createMessageRows(messages);
    // }

    this.createChatsFromResponse(chats);
    // this.createMessageRows(messages);
  };

  componentWillUnmount() {
    this.props.unsubscribe();
  }

  createMessageRows = (messages) => {
    let messageRows = messages.map(message => {
      // if (this.props.currentUser.role === message.sentBy) {
        if (this.props.role === message.sentBy) {
          console.log("Own Message")
        return <OwnMessage key={message.key} message={message} />;
      } else {
        console.log("Other Message")
        return <OtherMessage otherUser={this.props.otherUser} key={message.key} message={message} />;
      }
    });
    this.setState({ messages: messageRows });
    
  };

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
    console.log("chat",chat);
    console.log("Current User",this.props.currentUser);
    console.log("Other User",this.props.otherUser);
    const otherUserRole = this.props.currentUser.role === 'student' ? 'tutor' : 'student';
    // const otherUserRole = this.props.role === 'student' ? 'tutor' : 'student';
    this.props.showMessages(this.props.currentUser, {...chat.user, role: otherUserRole}, chat.key);
    this.props.loadMessages();

      this.setState({loadMessageState: true})
    
    // history.push(`/messages`);
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
  setEmoji(emoji,e) {

    var jsemoji = new JSEMOJI();
    // jsemoji.img_set = 'emojione';
// set the storage location for all emojis
jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

// some more settings...
// jsemoji.supports_css = false;
// jsemoji.allow_native = false;
jsemoji.replace_mode = 'unified';

    console.log(e);
    let emojiPic = jsemoji.replace_colons(`:${e.name}:`)
    this.setState({message: this.state.message +  emojiPic});
    // this.setState({emoji: emoji})
  }
  onFilesChange(files){
    console.log(files)
  }
 
  onFilesError(error, file){
    console.log('error code ' + error.code + ': ' + error.message)
  }


  //msging
  sendNewMessage = () => {
    const newMessage = this.state.message;
    console.log(this.state.emoji);
    if (!newMessage.trim()) { return }
    this.props.sendMessage(newMessage);
    this.setState({
      message: ''
    })
    
  };

  //files
  startUploading = (files) => {
    this.setState({ isUploadingFile: true });
    console.log("files",files[0]);
    this.props.uploadFile(files[0], { contentType: 'image/jpeg' });
    // files = null;
    // console.log("files",files[0])
  };
  render = () => {
    const {chats, isLoadingChats} = this.props;
    const { messages } = this.state;
    console.log("Ye msgs prop in Message.js",this.props.messages)
    console.log("render chats",chats);
    console.log("render msgs",messages);
    console.log("Other User",this.props.otherUser);
    console.log("current User",this.props.currentUser);
    const options = [
      { key: 1, text: 'All Read', value: 'read' },
      { key: 2, text: 'Unread', value:'unread' }
     
    ];
    const { name, submittedName } = this.state
    return (
      <Grid className='chatsContainer' >
        
        <Grid.Row style={{padding:'0 10px'}}>


      
      {/* Column */}
          <Grid.Column textAlign='left' width={4} className="left-message-tab" >
          <div className="searchbar"><Search /></div>
          <Grid.Row style={{height: '65vh', overflow: 'scroll',padding:'0 10px'}}>
            <Menu compact>
              <Dropdown text='All Recent' options={options} simple item />
            </Menu>
              <List divided relaxed>

                {
                  chats.map((chat)=>{
                    return <List.Item onClick={()=>{this.onChatSelected(chat)}}>
                    <List.Icon name='user ' size='large' verticalAlign='middle' />
                    <List.Content>
                      {/* <List.Header as='a'>{chat.user.name}</List.Header> */}
                      {
                        (this.props.currentUser.role === 'student') ?
                        (<List.Header as='a'>{chat.user.name}</List.Header>) : 
                        (<List.Header as='a'>{chat.user.firstName} {chat.user.lastName}</List.Header>)
                      }
                      <List.Description as='a'>{chat.lastMessage}</List.Description>
                    </List.Content>
                  </List.Item>
                  })
                }


              </List>

              </Grid.Row>
          </Grid.Column>
           {/* Column */}


{console.log(this.state.loadMessageState)}
{(this.state.loadMessageState)?(<Grid.Column textAlign='left' width={12} className="right-tab">

<Grid.Row className="header-message">
{
  (this.props.currentUser.role === 'student') ?
  (<Link to="tutors/88"><h2> <Icon name='user' size='large' />{this.props.otherUser.name}</h2></Link>) : 
  (<Link to="tutors/88"><h2> <Icon name='user' size='large' />{this.props.otherUser.firstName} {this.props.otherUser.lastName}</h2></Link>)
}
    {/* // <Link to="tutors/88"><h2> <Icon name='user' size='large' />{this.props.otherUser.firstName}</h2></Link> */}
</Grid.Row>
  

<Grid.Row  style={{height: '55vh', overflow: 'scroll',background: '#fff', paddingLeft: '15px'}}>



<List divided  relaxed id="chat">

{this.state.isEmoji?<EmojiPicker onEmojiClick={this.setEmoji.bind(this)} /> :''}
  {messages}


</List>

</Grid.Row>


<Grid.Row>
  
<Grid.Column width={8}>

<div style={{margin:'10px 0px'}}>
    <Form onSubmit={this.handleSubmit}>
        <Input className="message-input" name="message" value={this.state.message} onChange={this.handleChange} icon={<div className="inner-content"><Icon name='smile' size='large' link onClick={this.showEmoji}/><Files name={'selectedFile'} id="file" control={'input'} type='file' accept={'.jpg, .jpeg'} onChange={this.startUploading.bind(this)} onError={this.onFilesError} className="file-attachment"><Icon name='attach' size='large' link/></Files></div>}   placeholder='Type...'  />
      {/* {this.state.isEmoji?<EmojiPicker  onEmojiClick={this.setEmoji.bind(this)} /> :''} */}
       
        
        <Form.Button content='Submit' onClick={this.sendNewMessage} />
      
    </Form>
    
</div>
</Grid.Column>
</Grid.Row>


</Grid.Column>):(<div></div>)}
         
          





        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({auth, chatReducer,messageReducer}) => {
  console.log(auth);
  const {chats, error, isLoadingChats} = chatReducer;
  const {id, role, firstName, lastName} = auth;
  const {messages,currentUser,otherUser} =  messageReducer;
  return {currentUser: {id, role, firstName, lastName}, chats, error, isLoadingChats, messages,otherUser,role};
};

const mapActionsToProps = () => {
  return {
    loadChats: ChatActions.loadChats,
    showError: ChatActions.showError,
    showMessages: ChatActions.showMessages,
    unsubscribe: ChatActions.unsubscribe,

    loadMessages: MessageActions.loadMessages,
    sendMessage: MessageActions.sendMessage,
    uploadFile: MessageActions.uploadFile,
  }
};

export default connect(mapStateToProps, mapActionsToProps())(Message);
